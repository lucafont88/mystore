import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

import prisma from '../config/db';
import productRepository from '../repositories/product.repository';
import categoryRepository from '../repositories/category.repository';

describe('Product Repository', () => {
  beforeAll(async () => {
    try {
      await prisma.product.deleteMany();
      await prisma.category.deleteMany();
    } catch (e) {}
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const setupPrerequisites = async (suffix: string) => {
    const slug = `cat-${suffix}-${Date.now()}`;
    const cat = await categoryRepository.create({
      name: 'Test Category',
      slug: slug,
    });
    return cat.id;
  };

  it('should create a new product', async () => {
    const catId = await setupPrerequisites('create');
    const sku = `SKU-CREATE-${Date.now()}`;
    const data = {
      name: 'Test Product',
      slug: `test-product-create-${Date.now()}`,
      description: 'A great product',
      price: 99.99,
      sku: sku,
      stockQuantity: 10,
      vendorId: 'vendor-123',
      categoryId: catId,
    };

    const product = await productRepository.create(data);

    expect(product).toHaveProperty('id');
    expect(product.name).toBe(data.name);
    expect(Number(product.price)).toBe(data.price);
  });

  it('should find a product by ID', async () => {
    const catId = await setupPrerequisites('find');
    const sku = `SKU-ID-${Date.now()}`;
    const existing = await prisma.product.create({
      data: {
        name: 'Find Me',
        slug: `find-me-${Date.now()}`,
        price: 10,
        sku: sku,
        vendorId: 'v1',
        categoryId: catId
      }
    });
    const product = await productRepository.findById(existing.id);

    expect(product?.id).toBe(existing.id);
    expect(product?.category).toBeDefined();
  });

  it('should find products with filters (pagination)', async () => {
    // Ensure at least one product exists
    const catId = await setupPrerequisites('list');
    await prisma.product.create({
      data: {
        name: 'List Item',
        slug: `list-item-${Date.now()}`,
        price: 10,
        sku: `SKU-LIST-${Date.now()}`,
        vendorId: 'v1',
        categoryId: catId
      }
    });

    const result = await productRepository.findAll({ skip: 0, take: 10 });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
  });

  it('should update a product', async () => {
    const catId = await setupPrerequisites('update');
    const sku = `SKU-UP-${Date.now()}`;
    const existing = await prisma.product.create({
      data: {
        name: 'Update Me',
        slug: `update-me-${Date.now()}`,
        price: 10,
        sku: sku,
        vendorId: 'v1',
        categoryId: catId
      }
    });
    const updated = await productRepository.update(existing.id, { stockQuantity: 20 });

    expect(updated.stockQuantity).toBe(20);
  });

  it('should delete a product', async () => {
    const catId = await setupPrerequisites('delete');
    const sku = `SKU-DEL-${Date.now()}`;
    const target = await prisma.product.create({
      data: {
        name: 'Delete Me',
        slug: `delete-me-${Date.now()}`,
        price: 10,
        sku: sku,
        vendorId: 'v1',
        categoryId: catId
      }
    });
    await productRepository.delete(target.id);

    const check = await prisma.product.findUnique({ where: { id: target.id } });
    expect(check).toBeNull();
  });
});
