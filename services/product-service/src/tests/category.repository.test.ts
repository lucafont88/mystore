import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import prisma from '../config/db';
import categoryRepository from '../repositories/category.repository';

describe('Category Repository', () => {
  beforeAll(async () => {
    try {
      await prisma.product.deleteMany();
      await prisma.category.deleteMany();
    } catch (e) {}
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new category', async () => {
    const suffix = `repocreate-${Date.now()}`;
    const data = {
      name: 'Electronics Repo',
      slug: `electronics-${suffix}`,
      description: 'Gadgets and more',
    };

    const category = await categoryRepository.create(data);

    expect(category).toHaveProperty('id');
    expect(category.name).toBe(data.name);
    expect(category.slug).toBe(data.slug);
  });

  it('should create a child category', async () => {
    const suffix = `repochild-${Date.now()}`;
    const parent = await categoryRepository.create({ 
      name: 'Electronics Parent', 
      slug: `electronics-parent-${suffix}` 
    });
    
    const data = {
      name: 'Smartphones Repo',
      slug: `smartphones-${suffix}`,
      parentId: parent.id,
    };

    const category = await categoryRepository.create(data);

    expect(category.parentId).toBe(parent.id);
  });

  it('should get a category by ID', async () => {
    const suffix = `repoid-${Date.now()}`;
    const existing = await categoryRepository.create({ 
      name: 'Electronics ID', 
      slug: `electronics-id-${suffix}` 
    });
    const category = await categoryRepository.findById(existing.id);

    expect(category?.id).toBe(existing.id);
  });

  it('should get all categories including tree structure', async () => {
    const suffix = `repotree-${Date.now()}`;
    const parent = await categoryRepository.create({ 
      name: 'Tree Parent', 
      slug: `tree-parent-${suffix}` 
    });
    await categoryRepository.create({ 
      name: 'Tree Child', 
      slug: `tree-child-${suffix}`,
      parentId: parent.id
    });

    const categories = await categoryRepository.findAll();
    expect(categories.length).toBeGreaterThanOrEqual(2);
    
    const parentFound = categories.find(c => c.slug === `tree-parent-${suffix}`);
    expect(parentFound).toHaveProperty('children');
    expect(parentFound!.children.some((c: any) => c.slug === `tree-child-${suffix}`)).toBe(true);
  });

  it('should update a category', async () => {
    const suffix = `repoupdate-${Date.now()}`;
    const existing = await categoryRepository.create({ 
      name: 'Electronics Update', 
      slug: `electronics-update-${suffix}` 
    });
    const updated = await categoryRepository.update(existing.id, { description: 'Updated description repo' });

    expect(updated.description).toBe('Updated description repo');
  });

  it('should delete a category', async () => {
    const suffix = `repodelete-${Date.now()}`;
    const target = await categoryRepository.create({ 
      name: 'Smartphones Delete', 
      slug: `smartphones-delete-${suffix}` 
    });
    await categoryRepository.delete(target.id);

    const check = await prisma.category.findUnique({ where: { id: target.id } });
    expect(check).toBeNull();
  });
});