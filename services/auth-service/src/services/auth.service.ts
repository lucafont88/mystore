import argon2 from 'argon2';
import prisma from '../config/db';
import { User } from '../generated/client';
import { generateAccessToken, generateRefreshToken } from '../utils/token.util';
import redis from '../config/redis';
import { publishVendorRegistered } from '../events/vendorRegisteredPublisher';

export interface LoginResponse {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  async register(email: string, password: string, role: 'CUSTOMER' | 'VENDOR' = 'CUSTOMER'): Promise<Omit<User, 'passwordHash'>> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        profileStatus: role === 'VENDOR' ? 'PENDING_PROFILE' : 'COMPLETE',
      },
    });

    // Fire-and-forget: notify user-data-service to create placeholder profile
    if (role === 'VENDOR') {
      publishVendorRegistered(user.id, user.email).catch(() => {});
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string, ip: string = 'unknown'): Promise<LoginResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.isBanned) {
      throw new Error('Account bannato');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Aggiorna lastLoginAt e salva IP in background (fire-and-forget)
    Promise.all([
      prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }),
      prisma.userIpLog.create({ data: { userId: user.id, ipAddress: ip } })
        .then(async () => {
          const logs = await prisma.userIpLog.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            select: { id: true },
          });
          if (logs.length > 20) {
            await prisma.userIpLog.deleteMany({
              where: { id: { in: logs.slice(20).map((l) => l.id) } },
            });
          }
        }),
    ]).catch(() => {});

    const payload = { id: user.id, email: user.email, role: user.role, profileStatus: user.profileStatus };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store refresh token in Redis (expires in 7 days)
    await redis.set(`refresh_token:${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

    const { passwordHash: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }
}

export default new AuthService();
