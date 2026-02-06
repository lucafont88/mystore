import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import app from '../app';
import prisma from '../config/db';
import categoryRepository from '../repositories/category.repository';
import jwt from 'jsonwebtoken';

describe('Product Controller', () => {
  let categoryId: string;
  const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'supersecretaccesskey123';
  
  const vendorToken = jwt.sign(
    { id: 'vendor-1', email: 'vendor@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  const otherVendorToken = jwt.sign(
    { id: 'vendor-2', email: 'other@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  beforeAll(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const cat = await categoryRepository.create({
      name: 'Controller Category',
      slug: 'controller-category',
    });
    categoryId = cat.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a product', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        name: 'API Product',
        price: 25.50,
        sku: 'AP-001',
        stockQuantity: 10,
        categoryId: categoryId,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('API Product');
  });

  it('should update own product', async () => {
    const product = await prisma.product.findUnique({ where: { sku: 'AP-001' } });
    
    const res = await request(app)
      .put(`/api/v1/products/${product!.id}`)
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ stockQuantity: 50 });

    expect(res.status).toBe(200);
    expect(res.body.stockQuantity).toBe(50);
  });

  it('should fail to update other vendor product', async () => {
    const product = await prisma.product.findUnique({ where: { sku: 'AP-001' } });
    
    const res = await request(app)
      .put(`/api/v1/products/${product!.id}`)
      .set('Authorization', `Bearer ${otherVendorToken}`)
      .send({ stockQuantity: 99 });

    expect(res.status).toBe(403);
  });
});
