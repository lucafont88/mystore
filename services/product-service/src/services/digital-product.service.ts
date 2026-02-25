import slugify from 'slugify';
import prisma from '../config/db';
import { Product, ProductType } from '../generated/client';
import digitalFileRepository from '../repositories/digital-file.repository';
import digitalLicenseRepository from '../repositories/digital-license.repository';
import digitalAccessRepository from '../repositories/digital-access.repository';
import minioService from './minio.service';
import { publishProductCreated } from '../events/publisher';

export interface CreateDigitalProductInput {
  name: string;
  description?: string;
  price: number;
  sku: string;
  categoryId: string;
  images?: string[];
  isFeatured?: boolean;
  digitalType: 'DIGITAL_FILE' | 'DIGITAL_LICENSE' | 'DIGITAL_ACCESS';
  // DIGITAL_FILE specific
  fileBuffer?: Buffer;
  fileName?: string;
  mimeType?: string;
  maxDownloads?: number;
  // DIGITAL_ACCESS specific
  accessDurationDays?: number;
  accessUrl?: string;
}

export interface UpdateDigitalProductInput {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  images?: string[];
  isFeatured?: boolean;
  // DIGITAL_ACCESS specific
  accessDurationDays?: number;
  accessUrl?: string;
  maxDownloads?: number;
}

class DigitalProductService {
  async create(data: CreateDigitalProductInput, vendorId: string): Promise<Product> {
    const slug = slugify(data.name, { lower: true, strict: true });
    const existing = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const productType = data.digitalType as ProductType;

    const product = await prisma.$transaction(async (tx) => {
      const prod = await tx.product.create({
        data: {
          name: data.name,
          slug: finalSlug,
          description: data.description,
          price: data.price,
          sku: data.sku,
          stockQuantity: 0,
          vendorId,
          categoryId: data.categoryId,
          images: data.images || [],
          isFeatured: data.isFeatured || false,
          productType,
        },
        include: {
          category: true,
          digitalFile: true,
          digitalLicense: true,
          digitalAccess: true,
        },
      });

      switch (data.digitalType) {
        case 'DIGITAL_FILE':
          if (data.fileBuffer && data.fileName && data.mimeType) {
            const fileKey = `${vendorId}/${prod.id}/${data.fileName}`;
            await minioService.uploadFile(fileKey, data.fileBuffer, data.mimeType);
            await tx.digitalFile.create({
              data: {
                productId: prod.id,
                fileKey,
                fileName: data.fileName,
                fileSize: data.fileBuffer.length,
                mimeType: data.mimeType,
                maxDownloads: data.maxDownloads || 5,
              },
            });
          }
          break;
        case 'DIGITAL_LICENSE':
          await tx.digitalLicense.create({ data: { productId: prod.id } });
          break;
        case 'DIGITAL_ACCESS':
          await tx.digitalAccess.create({
            data: {
              productId: prod.id,
              accessDurationDays: data.accessDurationDays || 30,
              accessUrl: data.accessUrl,
            },
          });
          break;
      }

      return prod;
    });

    publishProductCreated(product).catch(() => {});
    return product;
  }

  async update(id: string, data: UpdateDigitalProductInput, vendorId: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { digitalFile: true, digitalAccess: true },
    });
    if (!product) throw new Error('Product not found');
    if (product.vendorId !== vendorId) throw new Error('Ownership verification failed');
    if (product.productType === 'PHYSICAL') throw new Error('This is not a digital product');

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

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        digitalFile: true,
        digitalLicense: true,
        digitalAccess: true,
      },
    });

    // Update subtype-specific fields
    if (product.productType === 'DIGITAL_FILE' && data.maxDownloads !== undefined) {
      await digitalFileRepository.update(id, { maxDownloads: data.maxDownloads });
    }
    if (product.productType === 'DIGITAL_ACCESS') {
      const accessUpdate: any = {};
      if (data.accessDurationDays !== undefined) accessUpdate.accessDurationDays = data.accessDurationDays;
      if (data.accessUrl !== undefined) accessUpdate.accessUrl = data.accessUrl;
      if (Object.keys(accessUpdate).length > 0) {
        await digitalAccessRepository.update(id, accessUpdate);
      }
    }

    return updated;
  }

  async uploadFile(productId: string, vendorId: string, buffer: Buffer, fileName: string, mimeType: string): Promise<void> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { digitalFile: true },
    });
    if (!product) throw new Error('Product not found');
    if (product.vendorId !== vendorId) throw new Error('Ownership verification failed');
    if (product.productType !== 'DIGITAL_FILE') throw new Error('Product is not a downloadable file type');

    const fileKey = `${vendorId}/${productId}/${fileName}`;

    // Delete old file if exists
    if (product.digitalFile) {
      await minioService.deleteFile(product.digitalFile.fileKey).catch(() => {});
      await digitalFileRepository.update(productId, {
        fileKey,
        fileName,
        fileSize: buffer.length,
        mimeType,
      });
    } else {
      await digitalFileRepository.create({
        productId,
        fileKey,
        fileName,
        fileSize: buffer.length,
        mimeType,
      });
    }

    await minioService.uploadFile(fileKey, buffer, mimeType);
  }

  async getDownloadUrl(productId: string): Promise<string> {
    const digitalFile = await digitalFileRepository.findByProductId(productId);
    if (!digitalFile) throw new Error('No file found for this product');
    return minioService.getPresignedDownloadUrl(digitalFile.fileKey);
  }
}

export default new DigitalProductService();
