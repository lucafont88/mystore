import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import app from '../app';
import prisma from '../config/db';

describe('Public Catalog Endpoints', () => {
  let productId: string;
  let categoryId: string;

  beforeAll(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const cat = await prisma.category.create({
      data: { name: 'Public Cat', slug: 'public-cat' }
    });
    categoryId = cat.id;

    const prod = await prisma.product.create({
      data: {
        name: 'Awesome Smartphone',
        slug: 'awesome-smartphone',
        price: 500,
        sku: 'AS-001',
        stockQuantity: 10,
        vendorId: 'v1',
        categoryId: categoryId
      }
    });
    productId = prod.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should list products with pagination', async () => {
    const res = await request(app).get('/api/v1/products?take=5&skip=0');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('total');
  });

  it('should search products by keyword', async () => {
    const res = await request(app).get('/api/v1/products?search=awesome');
    expect(res.status).toBe(200);
    expect(res.body.items.some((p: any) => p.name.includes('Awesome'))).toBe(true);
  });

  it('should get product by ID', async () => {
    const res = await request(app).get(`/api/v1/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });
});
