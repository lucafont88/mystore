import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import productService from '../services/product.service';
import prisma from '../config/db';
import categoryRepository from '../repositories/category.repository';

describe('Product Service', () => {
  let categoryId: string;

  beforeAll(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const cat = await categoryRepository.create({
      name: 'Service Category',
      slug: 'service-category',
    });
    categoryId = cat.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a product with valid data', async () => {
    const data = {
      name: 'Service Product',
      description: 'Business logic test',
      price: 50.00,
      sku: 'SP-001',
      stockQuantity: 5,
      vendorId: 'vendor-1',
      categoryId: categoryId,
    };

    const product = await productService.createProduct(data);
    expect(product.slug).toBe('service-product');
    expect(product.vendorId).toBe('vendor-1');
  });

  it('should throw error if stockQuantity is negative', async () => {
    const data = {
      name: 'Invalid Product',
      price: 10.00,
      sku: 'IP-001',
      stockQuantity: -1,
      vendorId: 'vendor-1',
      categoryId: categoryId,
    };

    await expect(productService.createProduct(data)).rejects.toThrow('Stock quantity cannot be negative');
  });

  it('should throw error if non-owner tries to update', async () => {
    const product = await prisma.product.findUnique({ where: { sku: 'SP-001' } });
    
    await expect(productService.updateProduct(product!.id, { stockQuantity: 10 }, 'wrong-vendor'))
      .rejects.toThrow('Ownership verification failed');
  });

  it('should allow Admin to update any product', async () => {
    const product = await prisma.product.findUnique({ where: { sku: 'SP-001' } });
    const updated = await productService.updateProduct(product!.id, { stockQuantity: 100 }, 'admin-id', true);
    
    expect(updated.stockQuantity).toBe(100);
  });
});
