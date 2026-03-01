import { Response } from 'express';
import argon2 from 'argon2';
import prisma from '../config/db';
import { AuthRequest } from '../middlewares/auth.middleware';

export class AdminUserController {
  async listUsers(req: AuthRequest, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          isBanned: true,
          lastLoginAt: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async changeRole(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { role } = req.body;

      const validRoles = ['CUSTOMER', 'VENDOR', 'ADMIN', 'SUPPORT'];
      if (!validRoles.includes(role)) {
        res.status(400).json({ error: 'Ruolo non valido' });
        return;
      }

      const user = await prisma.user.update({
        where: { id },
        data: { role },
        select: {
          id: true,
          email: true,
          role: true,
          isBanned: true,
          lastLoginAt: true,
          createdAt: true,
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async toggleBan(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { banned } = req.body;

      if (typeof banned !== 'boolean') {
        res.status(400).json({ error: 'Il campo banned deve essere un booleano' });
        return;
      }

      const user = await prisma.user.update({
        where: { id },
        data: { isBanned: banned },
        select: {
          id: true,
          email: true,
          role: true,
          isBanned: true,
          lastLoginAt: true,
          createdAt: true,
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async resetPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

      const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
      const tempPassword = `Tmp_${randomPart}!`;
      const passwordHash = await argon2.hash(tempPassword);

      await prisma.user.update({
        where: { id },
        data: { passwordHash },
      });

      res.status(200).json({ tempPassword });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AdminUserController();
