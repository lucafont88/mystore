import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import shopPageService from '../services/shop-page.service';

export class ShopPageController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }

      const page = await shopPageService.createPage({ title, description }, req.user!.id);
      res.status(201).json(page);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const filters = {
        skip: req.query.skip ? parseInt(req.query.skip as string) : 0,
        take: req.query.take ? parseInt(req.query.take as string) : 10,
        status: req.query.status as string | undefined,
      };

      const result = await shopPageService.listPages(req.user!.id, filters);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = await shopPageService.getPage(req.params.id as string, req.user!.id);
      res.status(200).json(page);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = await shopPageService.updatePage(req.params.id as string, req.body, req.user!.id);
      res.status(200).json(page);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async saveContent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { htmlContent } = req.body;
      if (!htmlContent) {
        res.status(400).json({ error: 'HTML content is required' });
        return;
      }

      const page = await shopPageService.saveContent(req.params.id as string, htmlContent, req.user!.id);
      res.status(200).json(page);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async publish(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = await shopPageService.publishPage(req.params.id as string, req.user!.id);
      res.status(200).json(page);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : error.message.includes('Only DRAFT') ? 409
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async unpublish(req: AuthRequest, res: Response): Promise<void> {
    try {
      const page = await shopPageService.unpublishPage(req.params.id as string, req.user!.id);
      res.status(200).json(page);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : error.message.includes('Only PUBLISHED') ? 409
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await shopPageService.deletePage(req.params.id as string, req.user!.id);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async addProducts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { productIds } = req.body;
      if (!Array.isArray(productIds) || productIds.length === 0) {
        res.status(400).json({ error: 'productIds array is required' });
        return;
      }

      await shopPageService.addProducts(req.params.id as string, productIds, req.user!.id);
      res.status(200).json({ message: 'Products added' });
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async removeProduct(req: AuthRequest, res: Response): Promise<void> {
    try {
      await shopPageService.removeProduct(req.params.id as string, req.params.productId as string, req.user!.id);
      res.status(204).send();
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getBuilder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const builder = await shopPageService.getBuilder(req.params.id as string, req.user!.id);
      res.status(200).json(builder);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async saveBuilder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { blocks } = req.body;
      if (!blocks || !Array.isArray(blocks)) {
        res.status(400).json({ error: 'blocks array is required' });
        return;
      }

      const page = await shopPageService.saveBuilder(
        req.params.id as string,
        { blocks },
        req.user!.id
      );
      res.status(200).json(page);
    } catch (error: any) {
      const status = error.message === 'Page not found' ? 404
        : error.message === 'Ownership verification failed' ? 403
        : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getPublicPage(req: Request, res: Response): Promise<void> {
    try {
      const result = await shopPageService.getPublicPage(req.params.slug as string);
      if (!result) {
        res.status(404).json({ error: 'Page not found or not published' });
        return;
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ShopPageController();
