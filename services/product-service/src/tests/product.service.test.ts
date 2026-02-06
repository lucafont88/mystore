import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import productService from '../services/product.service';
import prisma from '../config/db';
import categoryRepository from '../repositories/category.repository';

describe('Product Service', () => {
  beforeAll(async () => {
    try {
      await prisma.product.deleteMany();
      await prisma.category.deleteMany();
    } catch (e) {}
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const setupPrerequisites = async () => {
    const cat = await categoryRepository.create({
      name: 'Service Category',
      slug: `service-cat-${Date.now()}`,
    });
    return cat.id;
  };

  it('should create a product with valid data', async () => {
    const catId = await setupPrerequisites();
    const data = {
      name: `Service Product ${Date.now()}`,
      description: 'Business logic test',
      price: 50.00,
      sku: `SP-${Date.now()}`,
      stockQuantity: 5,
      vendorId: 'vendor-1',
      categoryId: catId,
    };

    const product = await productService.createProduct(data);
    expect(product.vendorId).toBe('vendor-1');
  });

  it('should throw error if stockQuantity is negative', async () => {
    const catId = await setupPrerequisites();
    const data = {
      name: 'Invalid Product',
      price: 10.00,
      sku: `IP-${Date.now()}`,
      stockQuantity: -1,
      vendorId: 'vendor-1',
      categoryId: catId,
    };

    await expect(productService.createProduct(data)).rejects.toThrow('Stock quantity cannot be negative');
  });

  it('should throw error if non-owner tries to update', async () => {
    const catId = await setupPrerequisites();
    const product = await prisma.product.create({
      data: {
        name: 'Own Product',
        slug: `own-prod-${Date.now()}`,
        price: 10,
        sku: `SKU-OWN-${Date.now()}`,
        vendorId: 'vendor-owner',
        categoryId: catId
      }
    });
    
    await expect(productService.updateProduct(product.id, { stockQuantity: 10 }, 'wrong-vendor'))
      .rejects.toThrow('Ownership verification failed');
  });

  it('should allow Admin to update any product', async () => {
    const catId = await setupPrerequisites();
    const product = await prisma.product.create({
      data: {
        name: 'Admin Target',
        slug: `admin-target-${Date.now()}`,
        price: 10,
        sku: `SKU-ADMIN-${Date.now()}`,
        vendorId: 'vendor-1',
        categoryId: catId
      }
    });
    const updated = await productService.updateProduct(product.id, { stockQuantity: 100 }, 'admin-id', true);
    
    expect(updated.stockQuantity).toBe(100);
  });
});