import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import app from '../app';
import prisma from '../config/db';

describe('Public Catalog Endpoints', () => {
  beforeAll(async () => {
    try {
      await prisma.product.deleteMany();
      await prisma.category.deleteMany();
    } catch (e) {}
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const setupData = async () => {
    const cat = await prisma.category.create({
      data: { name: 'Public Cat', slug: `public-cat-${Date.now()}` }
    });
    const prod = await prisma.product.create({
      data: {
        name: 'Awesome Smartphone',
        slug: `awesome-smartphone-${Date.now()}`,
        price: 500,
        sku: `AS-CAT-${Date.now()}`,
        stockQuantity: 10,
        vendorId: 'v1',
        categoryId: cat.id
      }
    });
    return { catId: cat.id, prodId: prod.id };
  };

  it('should list products with pagination', async () => {
    await setupData();
    const res = await request(app).get('/api/v1/products?take=5&skip=0');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('total');
  });

  it('should search products by keyword', async () => {
    await setupData();
    const res = await request(app).get('/api/v1/products?search=Awesome');
    expect(res.status).toBe(200);
    expect(res.body.items.some((p: any) => p.name.includes('Awesome'))).toBe(true);
  });

  it('should get product by ID', async () => {
    const { prodId } = await setupData();
    const res = await request(app).get(`/api/v1/products/${prodId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(prodId);
  });
});
