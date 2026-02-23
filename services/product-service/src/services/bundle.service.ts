import slugify from 'slugify';
import prisma from '../config/db';
import { Bundle } from '../generated/client';
import bundleRepository, { BundleFilter } from '../repositories/bundle.repository';

export interface CreateBundleInput {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  images?: string[];
  isFeatured?: boolean;
  items: { productId: string; quantity: number }[];
}

export interface UpdateBundleInput {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  images?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  items?: { productId: string; quantity: number }[];
}

class BundleService {
  async create(data: CreateBundleInput, vendorId: string): Promise<Bundle> {
    if (!data.items || data.items.length === 0) {
      throw new Error('Bundle must contain at least one product');
    }

    // Validate all products exist and belong to the vendor
    const productIds = data.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p.id);
      const missing = productIds.filter((id) => !foundIds.includes(id));
      throw new Error(`Products not found: ${missing.join(', ')}`);
    }

    const notOwned = products.filter((p) => p.vendorId !== vendorId);
    if (notOwned.length > 0) {
      throw new Error('All products in a bundle must belong to the same vendor');
    }

    const slug = slugify(data.name, { lower: true, strict: true });
    const existing = await bundleRepository.findBySlug(slug);
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const bundle = await prisma.bundle.create({
      data: {
        name: data.name,
        slug: finalSlug,
        description: data.description,
        price: data.price,
        vendorId,
        categoryId: data.categoryId,
        images: data.images || [],
        isFeatured: data.isFeatured || false,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: { include: { product: { include: { category: true } } } },
        category: true,
      },
    });

    return bundle;
  }

  async update(id: string, data: UpdateBundleInput, vendorId: string): Promise<Bundle> {
    const bundle = await bundleRepository.findById(id);
    if (!bundle) throw new Error('Bundle not found');
    if (bundle.vendorId !== vendorId) throw new Error('Ownership verification failed');

    const updateData: any = {};
    if (data.name) {
      updateData.name = data.name;
      updateData.slug = slugify(data.name, { lower: true, strict: true });
    }
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.categoryId) updateData.categoryId = data.categoryId;
    if (data.images) updateData.images = data.images;
    if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const updated = await bundleRepository.update(id, updateData);

    if (data.items) {
      // Validate items
      const productIds = data.items.map((i) => i.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });
      if (products.length !== productIds.length) {
        throw new Error('Some products not found');
      }
      const notOwned = products.filter((p) => p.vendorId !== vendorId);
      if (notOwned.length > 0) {
        throw new Error('All products in a bundle must belong to the same vendor');
      }

      await bundleRepository.setItems(id, data.items);
    }

    return bundleRepository.findById(id) as unknown as Bundle;
  }

  async delete(id: string, vendorId: string): Promise<Bundle> {
    const bundle = await bundleRepository.findById(id);
    if (!bundle) throw new Error('Bundle not found');
    if (bundle.vendorId !== vendorId) throw new Error('Ownership verification failed');

    return bundleRepository.delete(id);
  }

  async getById(id: string): Promise<Bundle | null> {
    return bundleRepository.findById(id) as unknown as Bundle | null;
  }

  async list(filters: BundleFilter) {
    // Public listings show only active bundles
    if (filters.vendorId === undefined) {
      filters.isActive = true;
    }
    return bundleRepository.findAll(filters);
  }
}

export default new BundleService();
