import { describe, it, expect, afterAll } from 'vitest';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import prisma from '../config/db';
import shopPageRepository from '../repositories/shop-page.repository';

describe('ShopPage Repository', () => {
  const createdPageIds: string[] = [];

  afterAll(async () => {
    try {
      if (createdPageIds.length) {
        await prisma.shopPage.deleteMany({ where: { id: { in: createdPageIds } } });
      }
    } catch (e) {}
    await prisma.$disconnect();
  });

  it('should create a new shop page', async () => {
    const page = await shopPageRepository.create({
      title: 'Test Page',
      slug: `test-page-${Date.now()}`,
      vendorId: 'vendor-1',
      status: 'NEW_PAGE',
    });
    createdPageIds.push(page.id);

    expect(page).toHaveProperty('id');
    expect(page.title).toBe('Test Page');
    expect(page.status).toBe('NEW_PAGE');
  });

  it('should find a page by ID with products', async () => {
    const page = await shopPageRepository.create({
      title: 'Find Me',
      slug: `find-me-${Date.now()}`,
      vendorId: 'vendor-1',
      status: 'NEW_PAGE',
    });
    createdPageIds.push(page.id);

    const found = await shopPageRepository.findById(page.id);
    expect(found?.id).toBe(page.id);
    expect(found?.products).toBeDefined();
  });

  it('should find pages by vendor with pagination', async () => {
    const page = await shopPageRepository.create({
      title: 'Vendor Page',
      slug: `vendor-page-${Date.now()}`,
      vendorId: 'vendor-repo-test',
      status: 'NEW_PAGE',
    });
    createdPageIds.push(page.id);

    const result = await shopPageRepository.findByVendor('vendor-repo-test', { skip: 0, take: 10 });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
  });

  it('should update a page', async () => {
    const page = await shopPageRepository.create({
      title: 'Update Me',
      slug: `update-me-${Date.now()}`,
      vendorId: 'vendor-1',
      status: 'NEW_PAGE',
    });
    createdPageIds.push(page.id);

    const updated = await shopPageRepository.update(page.id, { status: 'DRAFT' });
    expect(updated.status).toBe('DRAFT');
  });

  it('should add and remove products from a page', async () => {
    const page = await shopPageRepository.create({
      title: 'Products Page',
      slug: `products-page-${Date.now()}`,
      vendorId: 'vendor-1',
      status: 'DRAFT',
    });
    createdPageIds.push(page.id);

    await shopPageRepository.addProducts(page.id, ['prod-1', 'prod-2']);
    let productIds = await shopPageRepository.getProductIds(page.id);
    expect(productIds).toContain('prod-1');
    expect(productIds).toContain('prod-2');

    await shopPageRepository.removeProduct(page.id, 'prod-1');
    productIds = await shopPageRepository.getProductIds(page.id);
    expect(productIds).not.toContain('prod-1');
    expect(productIds).toContain('prod-2');
  });

  it('should delete a page', async () => {
    const page = await shopPageRepository.create({
      title: 'Delete Me',
      slug: `delete-me-${Date.now()}`,
      vendorId: 'vendor-1',
      status: 'NEW_PAGE',
    });

    await shopPageRepository.delete(page.id);
    const check = await prisma.shopPage.findUnique({ where: { id: page.id } });
    expect(check).toBeNull();
  });
});
