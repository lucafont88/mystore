import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/db';
import { publishIdentityVerified } from '../events/identityVerifiedPublisher';

export class AdminVendorProfileController {
  async getVendorProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as string;
      const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
      if (!profile) {
        res.status(404).json({ error: 'Profilo vendor non trovato' });
        return;
      }
      res.status(200).json(profile);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async setIdentityStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as string;
      const { status } = req.body;

      // Admin can only reset to PENDING (vendor retries Stripe) or force to VERIFIED (manual approval)
      // PROCESSING and FAILED are set automatically by Stripe webhook, not by admin
      const validStatuses = ['PENDING', 'VERIFIED'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ error: 'Status non valido. Usare PENDING o VERIFIED.' });
        return;
      }

      const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
      if (!profile) {
        res.status(404).json({ error: 'Profilo vendor non trovato' });
        return;
      }

      const updated = await prisma.vendorProfile.update({
        where: { userId },
        data: { identityStatus: status },
      });

      // If forced to VERIFIED, publish identity.verified event
      // => identityVerifiedConsumer in auth-service sets profileStatus=COMPLETE automatically
      if (status === 'VERIFIED') {
        await publishIdentityVerified(userId);
      }

      res.status(200).json(updated);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new AdminVendorProfileController();
