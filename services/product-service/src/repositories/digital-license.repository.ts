import prisma from '../config/db';
import { DigitalLicense, LicenseKey, Prisma } from '../generated/client';

export class DigitalLicenseRepository {
  async create(productId: string): Promise<DigitalLicense> {
    return prisma.digitalLicense.create({ data: { productId } });
  }

  async findByProductId(productId: string): Promise<(DigitalLicense & { keys: LicenseKey[] }) | null> {
    return prisma.digitalLicense.findUnique({
      where: { productId },
      include: { keys: true },
    });
  }

  async addKeys(digitalLicenseId: string, keys: string[]): Promise<number> {
    const data = keys.map((key) => ({
      digitalLicenseId,
      key,
    }));
    const result = await prisma.licenseKey.createMany({ data });
    return result.count;
  }

  async getKeys(digitalLicenseId: string): Promise<LicenseKey[]> {
    return prisma.licenseKey.findMany({
      where: { digitalLicenseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAvailableKeyCount(digitalLicenseId: string): Promise<number> {
    return prisma.licenseKey.count({
      where: { digitalLicenseId, isRedeemed: false },
    });
  }

  async redeemKey(digitalLicenseId: string, userId: string): Promise<LicenseKey | null> {
    // Find first unredeemed key and mark it
    const key = await prisma.licenseKey.findFirst({
      where: { digitalLicenseId, isRedeemed: false },
    });
    if (!key) return null;

    return prisma.licenseKey.update({
      where: { id: key.id },
      data: { isRedeemed: true, redeemedAt: new Date(), redeemedBy: userId },
    });
  }

  async deleteKey(keyId: string): Promise<LicenseKey> {
    return prisma.licenseKey.delete({ where: { id: keyId } });
  }

  async findKeyById(keyId: string): Promise<LicenseKey | null> {
    return prisma.licenseKey.findUnique({ where: { id: keyId } });
  }
}

export default new DigitalLicenseRepository();
