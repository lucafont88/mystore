import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import prisma from '../config/db';
import categoryRepository from '../repositories/category.repository';

describe('Category Repository', () => {
  beforeAll(async () => {
    // Clean up database before tests
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new category', async () => {
    const data = {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets and more',
    };

    const category = await categoryRepository.create(data);

    expect(category).toHaveProperty('id');
    expect(category.name).toBe(data.name);
    expect(category.slug).toBe(data.slug);
  });

  it('should create a child category', async () => {
    const parent = await prisma.category.findUnique({ where: { slug: 'electronics' } });
    
    const data = {
      name: 'Smartphones',
      slug: 'smartphones',
      parentId: parent!.id,
    };

    const category = await categoryRepository.create(data);

    expect(category.parentId).toBe(parent!.id);
  });

  it('should get a category by ID', async () => {
    const existing = await prisma.category.findUnique({ where: { slug: 'electronics' } });
    const category = await categoryRepository.findById(existing!.id);

    expect(category?.id).toBe(existing!.id);
  });

  it('should get all categories including tree structure', async () => {
    const categories = await categoryRepository.findAll();
    expect(categories.length).toBeGreaterThanOrEqual(2);
    
    const electronics = categories.find(c => c.slug === 'electronics');
    expect(electronics).toHaveProperty('children');
    expect(electronics!.children.some((c: any) => c.slug === 'smartphones')).toBe(true);
  });

  it('should update a category', async () => {
    const existing = await prisma.category.findUnique({ where: { slug: 'electronics' } });
    const updated = await categoryRepository.update(existing!.id, { description: 'Updated description' });

    expect(updated.description).toBe('Updated description');
  });

  it('should delete a category', async () => {
    const target = await prisma.category.findUnique({ where: { slug: 'smartphones' } });
    await categoryRepository.delete(target!.id);

    const check = await prisma.category.findUnique({ where: { id: target!.id } });
    expect(check).toBeNull();
  });
});