import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import bundleService from '../services/bundle.service';

class BundleController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const bundle = await bundleService.create(req.body, vendorId);
      res.status(201).json(bundle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const id = req.params.id as string;
      const bundle = await bundleService.update(id, req.body, vendorId);
      res.status(200).json(bundle);
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const id = req.params.id as string;
      await bundleService.delete(id, vendorId);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const bundle = await bundleService.getById(id);
      if (!bundle) {
        res.status(404).json({ error: 'Bundle not found' });
        return;
      }
      res.status(200).json(bundle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
        take: req.query.take ? parseInt(req.query.take as string) : 10,
        vendorId: req.query.vendorId as string,
        categoryId: req.query.categoryId as string,
        search: req.query.search as string,
      };
      const result = await bundleService.list(filters);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new BundleController();
