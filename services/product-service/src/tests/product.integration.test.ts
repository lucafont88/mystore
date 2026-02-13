import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import app from '../app';
import prisma from '../config/db';
import categoryRepository from '../repositories/category.repository';
import jwt from 'jsonwebtoken';

describe('Product Controller', () => {
  const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'supersecretaccesskey123';
  
  const vendorToken = jwt.sign(
    { id: 'vendor-1', email: 'vendor@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  const otherVendorToken = jwt.sign(
    { id: 'vendor-2', email: 'other@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  const createdProductIds: string[] = [];
  const createdCategoryIds: string[] = [];

  afterAll(async () => {
    try {
      if (createdProductIds.length) {
        await prisma.product.deleteMany({ where: { id: { in: createdProductIds } } });
      }
      if (createdCategoryIds.length) {
        await prisma.category.deleteMany({ where: { id: { in: createdCategoryIds } } });
      }
    } catch (e) {}
    await prisma.$disconnect();
  });

  const setupPrerequisites = async (suffix: string) => {
    const cat = await categoryRepository.create({
      name: `Controller Category ${suffix}`,
      slug: `controller-category-${suffix}-${Date.now()}`,
    });
    createdCategoryIds.push(cat.id);
    return cat.id;
  };

  it('should create a product', async () => {
    const catId = await setupPrerequisites('create');
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        name: `API Product ${Date.now()}`,
        price: 25.50,
        sku: `AP-CREATE-${Date.now()}`,
        stockQuantity: 10,
        categoryId: catId,
      });

    expect(res.status).toBe(201);
    if (res.body.id) createdProductIds.push(res.body.id);
  });

  it('should update own product', async () => {
    const catId = await setupPrerequisites('update');
    const product = await prisma.product.create({
      data: {
        name: 'Update Prod',
        slug: `up-prod-${Date.now()}`,
        price: 10,
        sku: `SKU-UP-INT-${Date.now()}`,
        vendorId: 'vendor-1',
        categoryId: catId
      }
    });
    createdProductIds.push(product.id);

    const res = await request(app)
      .put(`/api/v1/products/${product.id}`)
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ stockQuantity: 50 });

    expect(res.status).toBe(200);
    expect(res.body.stockQuantity).toBe(50);
  });

  it('should fail to update other vendor product', async () => {
    const catId = await setupPrerequisites('fail-update');
    const product = await prisma.product.create({
      data: {
        name: 'Other Prod',
        slug: `other-prod-${Date.now()}`,
        price: 10,
        sku: `SKU-OTHER-INT-${Date.now()}`,
        vendorId: 'vendor-1',
        categoryId: catId
      }
    });
    createdProductIds.push(product.id);
    
    const res = await request(app)
      .put(`/api/v1/products/${product.id}`)
      .set('Authorization', `Bearer ${otherVendorToken}`)
      .send({ stockQuantity: 99 });

    expect(res.status).toBe(403);
  });
});
