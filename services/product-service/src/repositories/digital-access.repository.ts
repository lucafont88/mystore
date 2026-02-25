import prisma from '../config/db';
import { DigitalAccess, Prisma } from '../generated/client';

export class DigitalAccessRepository {
  async create(data: Prisma.DigitalAccessUncheckedCreateInput): Promise<DigitalAccess> {
    return prisma.digitalAccess.create({ data });
  }

  async findByProductId(productId: string): Promise<DigitalAccess | null> {
    return prisma.digitalAccess.findUnique({ where: { productId } });
  }

  async update(productId: string, data: Prisma.DigitalAccessUpdateInput): Promise<DigitalAccess> {
    return prisma.digitalAccess.update({
      where: { productId },
      data,
    });
  }

  async delete(productId: string): Promise<DigitalAccess> {
    return prisma.digitalAccess.delete({ where: { productId } });
  }
}

export default new DigitalAccessRepository();
