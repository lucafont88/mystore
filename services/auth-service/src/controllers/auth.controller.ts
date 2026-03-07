import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import argon2 from 'argon2';
import authService from '../services/auth.service';
import prisma from '../config/db';
import { generateOtp, storeOtp, verifyAndConsumeOtp } from '../services/otp.service';
import { sendOtpEmail } from '../services/email.service';

export class AuthController {
  async checkEmail(req: Request, res: Response): Promise<void> {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    res.status(200).json({ exists: !!user });
  }

  async register(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, role } = req.body;

    try {
      const user = await authService.register(email, password, role);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    try {
      const result = await authService.login(email, password, ip);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({ error: error.message });
      } else if (error.message === 'Account bannato') {
        res.status(403).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, role = 'CUSTOMER' } = req.body;

    try {
      // Controlla se l'email è già registrata
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        res.status(409).json({ error: 'Email already in use' });
        return;
      }

      // Hash della password prima di salvarla in Redis (mai plaintext)
      const passwordHash = await argon2.hash(password);

      const otp = generateOtp();
      await storeOtp(email, otp, passwordHash, role);
      await sendOtpEmail(email, otp);

      res.status(200).json({ message: 'OTP sent' });
    } catch (error: any) {
      console.error('sendOtp error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, otp } = req.body;

    try {
      const payload = await verifyAndConsumeOtp(email, otp);
      if (!payload) {
        res.status(400).json({ error: 'OTP non valido o scaduto' });
        return;
      }

      const user = await authService.createUser(email, payload.passwordHash, payload.role);
      res.status(201).json(user);
    } catch (error: any) {
      console.error('verifyOtp error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        profileStatus: true,
        isBanned: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({ user });
  }
}

export default new AuthController();
