import { Request, Response } from 'express';
import categoryRepository from '../repositories/category.repository';
import slugify from 'slugify';
import { getCachedCategories, setCachedCategories, invalidateCategoriesCache } from '../services/category-cache.service';

export class CategoryController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, parentId } = req.body;
      const slug = slugify(name, { lower: true, strict: true });
      
      const category = await categoryRepository.create({
        name,
        slug,
        description,
        parentId,
      });
      await invalidateCategoriesCache();
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { name } = req.body;
      if (name) {
        req.body.slug = slugify(name, { lower: true, strict: true });
      }
      const category = await categoryRepository.update(id, req.body);
      await invalidateCategoriesCache();
      res.status(200).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await categoryRepository.delete(id);
      await invalidateCategoriesCache();
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const cached = await getCachedCategories();
      if (cached) {
        res.status(200).json(cached);
        return;
      }

      const categories = await categoryRepository.findAll();
      setCachedCategories(categories);
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const category = await categoryRepository.findById(id);
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.status(200).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new CategoryController();