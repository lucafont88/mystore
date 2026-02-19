import prisma from '../config/db';
import { ShopPage, Prisma } from '../generated/client';

export interface ShopPageFilter {
  skip?: number;
  take?: number;
  vendorId?: string;
  status?: string;
}

export interface PaginatedShopPages {
  items: ShopPage[];
  total: number;
}

class ShopPageRepository {
  async create(data: Prisma.ShopPageUncheckedCreateInput): Promise<ShopPage> {
    return prisma.shopPage.create({ data });
  }

  async findById(id: string): Promise<(ShopPage & { products: any[] }) | null> {
    return prisma.shopPage.findUnique({
      where: { id },
      include: { products: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async findBySlug(slug: string): Promise<(ShopPage & { products: any[] }) | null> {
    return prisma.shopPage.findUnique({
      where: { slug },
      include: { products: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async findByVendor(vendorId: string, filter: ShopPageFilter = {}): Promise<PaginatedShopPages> {
    const where: Prisma.ShopPageWhereInput = { vendorId };
    if (filter.status) {
      where.status = filter.status as any;
    }

    const [items, total] = await Promise.all([
      prisma.shopPage.findMany({
        where,
        skip: filter.skip || 0,
        take: filter.take || 10,
        orderBy: { createdAt: 'desc' },
        include: { products: { orderBy: { sortOrder: 'asc' } } },
      }),
      prisma.shopPage.count({ where }),
    ]);

    return { items, total };
  }

  async update(id: string, data: Prisma.ShopPageUpdateInput): Promise<ShopPage> {
    return prisma.shopPage.update({ where: { id }, data });
  }

  async delete(id: string): Promise<ShopPage> {
    return prisma.shopPage.delete({ where: { id } });
  }

  async addProducts(shopPageId: string, productIds: string[]): Promise<void> {
    const data = productIds.map((productId, index) => ({
      shopPageId,
      productId,
      sortOrder: index,
    }));

    await prisma.shopPageProduct.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async removeProduct(shopPageId: string, productId: string): Promise<void> {
    await prisma.shopPageProduct.delete({
      where: { shopPageId_productId: { shopPageId, productId } },
    });
  }

  async getBuilder(id: string): Promise<{ builder: any; vendorId: string } | null> {
    return prisma.shopPage.findUnique({
      where: { id },
      select: { builder: true, vendorId: true },
    });
  }

  async updateBuilder(id: string, builder: any): Promise<ShopPage> {
    return prisma.shopPage.update({
      where: { id },
      data: { builder },
    });
  }

  async getProductIds(shopPageId: string): Promise<string[]> {
    const products = await prisma.shopPageProduct.findMany({
      where: { shopPageId },
      select: { productId: true },
      orderBy: { sortOrder: 'asc' },
    });
    return products.map((p) => p.productId);
  }
}

export default new ShopPageRepository();
