import { Request, Response } from 'express';
import productService from '../services/product.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class ProductController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const vendorId = req.user!.id;
      const product = await productService.createProduct({
        ...req.body,
        vendorId,
      });
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const isAdmin = req.user!.role === 'ADMIN';
      const id = req.params.id as string;
      const product = await productService.updateProduct(id, req.body, userId, isAdmin);
      res.status(200).json(product);
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const isAdmin = req.user!.role === 'ADMIN';
      const id = req.params.id as string;
      await productService.deleteProduct(id, userId, isAdmin);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Ownership verification failed' ? 403 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
        take: req.query.take ? parseInt(req.query.take as string) : 10,
        categoryId: req.query.categoryId as string,
        vendorId: req.query.vendorId as string,
        search: req.query.search as string,
        productType: req.query.productType as string | undefined,
      };
      const result = await productService.listProducts(filters);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ProductController();