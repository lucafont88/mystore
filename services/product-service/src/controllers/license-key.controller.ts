import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import licenseKeyService from '../services/license-key.service';

class LicenseKeyController {
  async addKeys(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const productId = req.params.id as string;
      const { keys } = req.body;

      if (!keys || !Array.isArray(keys)) {
        res.status(400).json({ error: 'keys must be an array of strings' });
        return;
      }

      const count = await licenseKeyService.addKeys(productId, vendorId, keys);
      res.status(201).json({ added: count });
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getKeys(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const productId = req.params.id as string;
      const keys = await licenseKeyService.getKeys(productId, vendorId);
      res.status(200).json(keys);
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async deleteKey(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const productId = req.params.id as string;
      const keyId = req.params.keyId as string;
      await licenseKeyService.deleteKey(productId, keyId, vendorId);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}

export default new LicenseKeyController();
