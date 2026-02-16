import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import app from '../app';
import prisma from '../config/db';
import jwt from 'jsonwebtoken';

describe('ShopPage Controller', () => {
  const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'supersecretaccesskey123';

  const vendorToken = jwt.sign(
    { id: 'vendor-1', email: 'vendor@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  const customerToken = jwt.sign(
    { id: 'customer-1', email: 'customer@test.com', role: 'CUSTOMER' },
    JWT_SECRET
  );

  const otherVendorToken = jwt.sign(
    { id: 'vendor-2', email: 'other@test.com', role: 'VENDOR' },
    JWT_SECRET
  );

  const createdPageIds: string[] = [];

  afterAll(async () => {
    try {
      if (createdPageIds.length) {
        await prisma.shopPage.deleteMany({ where: { id: { in: createdPageIds } } });
      }
    } catch (e) {}
    await prisma.$disconnect();
  });

  it('should create a shop page as VENDOR', async () => {
    const res = await request(app)
      .post('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ title: `Integration Page ${Date.now()}` });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('NEW_PAGE');
    if (res.body.id) createdPageIds.push(res.body.id);
  });

  it('should fail to create as CUSTOMER', async () => {
    const res = await request(app)
      .post('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ title: 'Restricted Page' });

    expect(res.status).toBe(403);
  });

  it('should list vendor pages', async () => {
    const res = await request(app)
      .get('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${vendorToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('total');
  });

  it('should get page by ID', async () => {
    // Create a page first
    const createRes = await request(app)
      .post('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ title: `GetById Page ${Date.now()}` });
    if (createRes.body.id) createdPageIds.push(createRes.body.id);

    const res = await request(app)
      .get(`/api/v1/shop-pages/${createRes.body.id}`)
      .set('Authorization', `Bearer ${vendorToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createRes.body.id);
  });

  it('should fail to get another vendors page', async () => {
    const createRes = await request(app)
      .post('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ title: `Other Vendor Page ${Date.now()}` });
    if (createRes.body.id) createdPageIds.push(createRes.body.id);

    const res = await request(app)
      .get(`/api/v1/shop-pages/${createRes.body.id}`)
      .set('Authorization', `Bearer ${otherVendorToken}`);

    expect(res.status).toBe(403);
  });

  it('should update page metadata', async () => {
    const createRes = await request(app)
      .post('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ title: `Update Page ${Date.now()}` });
    if (createRes.body.id) createdPageIds.push(createRes.body.id);

    const res = await request(app)
      .put(`/api/v1/shop-pages/${createRes.body.id}`)
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ description: 'Updated description' });

    expect(res.status).toBe(200);
    expect(res.body.description).toBe('Updated description');
  });

  it('should delete a page', async () => {
    const createRes = await request(app)
      .post('/api/v1/shop-pages')
      .set('Authorization', `Bearer ${vendorToken}`)
      .send({ title: `Delete Page ${Date.now()}` });

    const res = await request(app)
      .delete(`/api/v1/shop-pages/${createRes.body.id}`)
      .set('Authorization', `Bearer ${vendorToken}`);

    expect(res.status).toBe(204);
  });
});
