import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import digitalProductService from '../services/digital-product.service';

class DigitalProductController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const file = (req as any).file;

      const input = {
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
        sku: req.body.sku,
        categoryId: req.body.categoryId,
        images: req.body.images ? JSON.parse(req.body.images) : [],
        isFeatured: req.body.isFeatured === 'true',
        digitalType: req.body.digitalType,
        // DIGITAL_FILE
        fileBuffer: file?.buffer,
        fileName: file?.originalname,
        mimeType: file?.mimetype,
        maxDownloads: req.body.maxDownloads ? parseInt(req.body.maxDownloads) : undefined,
        // DIGITAL_ACCESS
        accessDurationDays: req.body.accessDurationDays ? parseInt(req.body.accessDurationDays) : undefined,
        accessUrl: req.body.accessUrl,
      };

      const product = await digitalProductService.create(input, vendorId);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const id = req.params.id as string;
      const product = await digitalProductService.update(id, req.body, vendorId);
      res.status(200).json(product);
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async uploadFile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const id = req.params.id as string;
      const file = (req as any).file;
      if (!file) {
        res.status(400).json({ error: 'No file provided' });
        return;
      }
      await digitalProductService.uploadFile(id, vendorId, file.buffer, file.originalname, file.mimetype);
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getDownloadUrl(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      // TODO: verify purchase when order system is implemented
      const url = await digitalProductService.getDownloadUrl(id);
      res.status(200).json({ downloadUrl: url });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new DigitalProductController();
