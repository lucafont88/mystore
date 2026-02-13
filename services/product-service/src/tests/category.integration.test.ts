import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import app from '../app';
import prisma from '../config/db';
import jwt from 'jsonwebtoken';

describe('Category Controller', () => {
  const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'supersecretaccesskey123';
  
  const adminToken = jwt.sign(
    { id: 'admin-1', email: 'admin@test.com', role: 'ADMIN' },
    JWT_SECRET
  );

  const vendorToken = jwt.sign(
    { id: 'vendor-1', email: 'vendor@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  const createdCategoryIds: string[] = [];

  afterAll(async () => {
    try {
      if (createdCategoryIds.length) {
        await prisma.category.deleteMany({ where: { id: { in: createdCategoryIds } } });
      }
    } catch (e) {}
    await prisma.$disconnect();
  });

  it('should create a category as Admin', async () => {
    const res = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Home Appliances',
        slug: `home-appliances-${Date.now()}`,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Home Appliances');
    if (res.body.id) createdCategoryIds.push(res.body.id);
  });

  it('should fail to create category as Vendor', async () => {
    const res = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({
        name: 'Restricted',
        slug: `restricted-${Date.now()}`,
      });

    expect(res.status).toBe(403);
  });

  it('should get category tree publicly', async () => {
    const res = await request(app).get('/api/v1/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});