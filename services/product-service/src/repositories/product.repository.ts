import prisma from '../config/db';
import { Product, ProductType, Prisma } from '../generated/client';

export interface ProductFilter {
  skip?: number;
  take?: number;
  categoryId?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  productType?: ProductType;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
}

const productInclude = {
  category: true,
  digitalFile: true,
  digitalLicense: true,
  digitalAccess: true,
} as const;

export class ProductRepository {
  async create(data: Prisma.ProductCreateInput | Prisma.ProductUncheckedCreateInput): Promise<Product> {
    return prisma.product.create({
      // @ts-ignore
      data,
      include: productInclude,
    });
  }

  async findById(id: string): Promise<(Product & { category: any }) | null> {
    return prisma.product.findUnique({
      where: { id },
      include: productInclude,
    }) as Promise<(Product & { category: any }) | null>;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { slug },
      include: productInclude,
    });
  }

  async findAll(filter: ProductFilter): Promise<PaginatedProducts> {
    const { skip = 0, take = 10, categoryId, vendorId, minPrice, maxPrice, search, productType } = filter;

    const where: Prisma.ProductWhereInput = {};

    if (categoryId) where.categoryId = categoryId;
    if (vendorId) where.vendorId = vendorId;
    if (productType) where.productType = productType;
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
        include: productInclude,
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
      include: productInclude,
    });
  }

  async delete(id: string): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }
}

export default new ProductRepository();
