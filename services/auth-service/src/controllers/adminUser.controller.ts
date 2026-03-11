import { Response } from 'express';
import argon2 from 'argon2';
import prisma from '../config/db';
import { AuthRequest } from '../middlewares/auth.middleware';
import { publishUserDeleted } from '../events/userDeletedPublisher';

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
          ipLogs: {
            orderBy: { createdAt: 'desc' },
            take: 20,
            select: { ipAddress: true, createdAt: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      const result = users.map((u) => ({
        id: u.id,
        email: u.email,
        role: u.role,
        isBanned: u.isBanned,
        lastLoginAt: u.lastLoginAt,
        createdAt: u.createdAt,
        lastIp: u.ipLogs[0]?.ipAddress ?? null,
        ipHistory: u.ipLogs,
      }));

      res.status(200).json(result);
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

  async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

      // Impedisce all'admin di cancellare se stesso
      if (req.user?.id === id) {
        res.status(400).json({ error: 'Non puoi cancellare il tuo account' });
        return;
      }

      const user = await prisma.user.findUnique({ where: { id }, select: { id: true, role: true } });
      if (!user) {
        res.status(404).json({ error: 'Utente non trovato' });
        return;
      }

      // Pubblica l'evento PRIMA di cancellare, così i consumer possono usare l'userId
      await publishUserDeleted(user.id, user.role);

      // Cancella l'utente (UserIpLog in cascade tramite DB)
      await prisma.user.delete({ where: { id } });

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserDetail(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          role: true,
          isBanned: true,
          profileStatus: true,
          lastLoginAt: true,
          createdAt: true,
          ipLogs: {
            orderBy: { createdAt: 'desc' },
            take: 20,
            select: { ipAddress: true, createdAt: true },
          },
        },
      });
      if (!user) {
        res.status(404).json({ error: 'Utente non trovato' });
        return;
      }
      res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        isBanned: user.isBanned,
        profileStatus: user.profileStatus,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        ipHistory: user.ipLogs,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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
