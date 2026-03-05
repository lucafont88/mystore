import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth.middleware';
import vendorProfileService from '../services/vendorProfile.service';

export class VendorProfileController {
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user!.id;

    try {
      const profile = await vendorProfileService.getProfile(userId);
      if (!profile || profile.status === 'PENDING') {
        res.status(404).json({ error: 'Profile not found' });
        return;
      }
      res.status(200).json(profile);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async upsertProfile(req: AuthRequest, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const userId = req.user!.id;

    try {
      const profile = await vendorProfileService.upsertProfile(userId, req.body);
      res.status(200).json(profile);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Fiscal code already in use' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

export default new VendorProfileController();
