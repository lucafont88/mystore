import prisma from '../config/db';
import { Product, Prisma } from '../generated/client';

export interface ProductFilter {
  skip?: number;
  take?: number;
  categoryId?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
}

export class ProductRepository {
  async create(data: Prisma.ProductCreateInput | Prisma.ProductUncheckedCreateInput): Promise<Product> {
    return prisma.product.create({
      // @ts-ignore
      data,
    });
  }

  async findById(id: string): Promise<(Product & { category: any }) | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    }) as Promise<(Product & { category: any }) | null>;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });
  }

  async findAll(filter: ProductFilter): Promise<PaginatedProducts> {
    const { skip = 0, take = 10, categoryId, vendorId, minPrice, maxPrice, search } = filter;

    const where: Prisma.ProductWhereInput = {};

    if (categoryId) where.categoryId = categoryId;
    if (vendorId) where.vendorId = vendorId;
    if (minPrice || maxPrice) {
      where.price = {
        gte: minPrice,
        lte: maxPrice,
      };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return { items, total };
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }
}

export default new ProductRepository();
