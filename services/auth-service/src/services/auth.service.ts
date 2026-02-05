import argon2 from 'argon2';
import prisma from '../config/db';
import { User } from '@prisma/client';

export class AuthService {
  async register(email: string, password: string): Promise<Omit<User, 'passwordHash'>> {
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
      },
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new AuthService();
