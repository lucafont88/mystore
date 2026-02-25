import prisma from '../config/db';
import { DigitalFile, Prisma } from '../generated/client';

export class DigitalFileRepository {
  async create(data: Prisma.DigitalFileUncheckedCreateInput): Promise<DigitalFile> {
    return prisma.digitalFile.create({ data });
  }

  async findByProductId(productId: string): Promise<DigitalFile | null> {
    return prisma.digitalFile.findUnique({ where: { productId } });
  }

  async update(productId: string, data: Prisma.DigitalFileUpdateInput): Promise<DigitalFile> {
    return prisma.digitalFile.update({
      where: { productId },
      data,
    });
  }

  async delete(productId: string): Promise<DigitalFile> {
    return prisma.digitalFile.delete({ where: { productId } });
  }
}

export default new DigitalFileRepository();
