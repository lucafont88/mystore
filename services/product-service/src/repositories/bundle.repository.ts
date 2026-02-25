import prisma from '../config/db';
import { Bundle, BundleItem, Prisma } from '../generated/client';

export interface BundleFilter {
  skip?: number;
  take?: number;
  vendorId?: string;
  categoryId?: string;
  isActive?: boolean;
  search?: string;
}

export interface PaginatedBundles {
  items: (Bundle & { items: (BundleItem & { product: any })[] })[];
  total: number;
}

const bundleInclude = {
  items: {
    include: {
      product: {
        include: { category: true },
      },
    },
  },
  category: true,
} as const;

export class BundleRepository {
  async create(data: Prisma.BundleUncheckedCreateInput): Promise<Bundle> {
    return prisma.bundle.create({
      data,
      include: bundleInclude,
    }) as unknown as Bundle;
  }

  async findById(id: string): Promise<(Bundle & { items: (BundleItem & { product: any })[] }) | null> {
    return prisma.bundle.findUnique({
      where: { id },
      include: bundleInclude,
    }) as any;
  }

  async findBySlug(slug: string): Promise<Bundle | null> {
    return prisma.bundle.findUnique({
      where: { slug },
      include: bundleInclude,
    });
  }

  async findAll(filter: BundleFilter): Promise<PaginatedBundles> {
    const { skip = 0, take = 10, vendorId, categoryId, isActive, search } = filter;

    const where: Prisma.BundleWhereInput = {};
    if (vendorId) where.vendorId = vendorId;
    if (categoryId) where.categoryId = categoryId;
    if (isActive !== undefined) where.isActive = isActive;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.bundle.findMany({
        where,
        skip,
        take,
        include: bundleInclude,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.bundle.count({ where }),
    ]);

    return { items: items as any, total };
  }

  async update(id: string, data: Prisma.BundleUncheckedUpdateInput): Promise<Bundle> {
    return prisma.bundle.update({
      where: { id },
      data,
      include: bundleInclude,
    }) as unknown as Bundle;
  }

  async delete(id: string): Promise<Bundle> {
    return prisma.bundle.delete({ where: { id } });
  }

  async setItems(bundleId: string, items: { productId: string; quantity: number }[]): Promise<void> {
    await prisma.$transaction([
      prisma.bundleItem.deleteMany({ where: { bundleId } }),
      prisma.bundleItem.createMany({
        data: items.map((item) => ({ bundleId, ...item })),
      }),
    ]);
  }
}

export default new BundleRepository();
