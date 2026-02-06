import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import prisma from '../config/db';
import productRepository from '../repositories/product.repository';
import categoryRepository from '../repositories/category.repository';

describe('Product Repository', () => {
  let categoryId: string;

  beforeAll(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const cat = await categoryRepository.create({
      name: 'Test Category',
      slug: 'test-category',
    });
    categoryId = cat.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new product', async () => {
    const data = {
      name: 'Test Product',
      slug: 'test-product',
      description: 'A great product',
      price: 99.99,
      sku: 'TP-001',
      stockQuantity: 10,
      vendorId: 'vendor-123',
      categoryId: categoryId,
    };

    const product = await productRepository.create(data);

    expect(product).toHaveProperty('id');
    expect(product.name).toBe(data.name);
    expect(Number(product.price)).toBe(data.price);
  });

  it('should find a product by ID', async () => {
    const existing = await prisma.product.findUnique({ where: { sku: 'TP-001' } });
    const product = await productRepository.findById(existing!.id);

    expect(product?.id).toBe(existing!.id);
    expect(product?.category).toBeDefined();
  });

  it('should find products with filters (pagination)', async () => {
    const result = await productRepository.findAll({ skip: 0, take: 10 });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
  });

  it('should update a product', async () => {
    const existing = await prisma.product.findUnique({ where: { sku: 'TP-001' } });
    const updated = await productRepository.update(existing!.id, { stockQuantity: 20 });

    expect(updated.stockQuantity).toBe(20);
  });

  it('should delete a product', async () => {
    const target = await prisma.product.findUnique({ where: { sku: 'TP-001' } });
    await productRepository.delete(target!.id);

    const check = await prisma.product.findUnique({ where: { id: target!.id } });
    expect(check).toBeNull();
  });
});
