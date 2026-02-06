import slugify from 'slugify';
import productRepository from '../repositories/product.repository';
import { Product, Prisma } from '@prisma/client';

export class ProductService {
  async createProduct(data: any): Promise<Product> {
    if (data.stockQuantity < 0) {
      throw new Error('Stock quantity cannot be negative');
    }

    const slug = slugify(data.name, { lower: true, strict: true });
    
    // Check for slug uniqueness (simple implementation)
    const existing = await productRepository.findBySlug(slug);
    let finalSlug = slug;
    if (existing) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    return productRepository.create({
      ...data,
      slug: finalSlug,
    });
  }

  async updateProduct(id: string, data: any, userId: string, isAdmin: boolean = false): Promise<Product> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!isAdmin && product.vendorId !== userId) {
      throw new Error('Ownership verification failed');
    }

    if (data.stockQuantity !== undefined && data.stockQuantity < 0) {
      throw new Error('Stock quantity cannot be negative');
    }

    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    return productRepository.update(id, data);
  }

  async deleteProduct(id: string, userId: string, isAdmin: boolean = false): Promise<Product> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!isAdmin && product.vendorId !== userId) {
      throw new Error('Ownership verification failed');
    }

    return productRepository.delete(id);
  }

  async getProductById(id: string): Promise<Product | null> {
    return productRepository.findById(id);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return productRepository.findBySlug(slug);
  }

  async listProducts(filters: any): Promise<any> {
    return productRepository.findAll(filters);
  }
}

export default new ProductService();
