import prisma from '../config/db';
import { Category, Prisma } from '../generated/client';

export class CategoryRepository {
  async create(data: Prisma.CategoryCreateInput | Prisma.CategoryUncheckedCreateInput): Promise<Category> {
    return prisma.category.create({
      data: data as Prisma.CategoryCreateInput,
    });
  }

  async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
      },
    });
  }

  async findAll(): Promise<(Category & { children: Category[] })[]> {
    // For a tree structure, we could fetch everything and build it in memory,
    // or fetch top-level and include children. Here we fetch all and include one level of children.
    return prisma.category.findMany({
      include: {
        children: true,
      },
    }) as Promise<(Category & { children: Category[] })[]>;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }
}

export default new CategoryRepository();
