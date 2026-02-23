import prisma from '../config/db';
import digitalLicenseRepository from '../repositories/digital-license.repository';
import { LicenseKey } from '../generated/client';

class LicenseKeyService {
  async addKeys(productId: string, vendorId: string, keys: string[]): Promise<number> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { digitalLicense: true },
    });
    if (!product) throw new Error('Product not found');
    if (product.vendorId !== vendorId) throw new Error('Ownership verification failed');
    if (product.productType !== 'DIGITAL_LICENSE') throw new Error('Product is not a license type');
    if (!product.digitalLicense) throw new Error('License record not found');

    const uniqueKeys = [...new Set(keys.filter((k) => k.trim().length > 0))];
    if (uniqueKeys.length === 0) throw new Error('No valid keys provided');

    return digitalLicenseRepository.addKeys(product.digitalLicense.id, uniqueKeys);
  }

  async getKeys(productId: string, vendorId: string): Promise<LicenseKey[]> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { digitalLicense: true },
    });
    if (!product) throw new Error('Product not found');
    if (product.vendorId !== vendorId) throw new Error('Ownership verification failed');
    if (!product.digitalLicense) throw new Error('License record not found');

    return digitalLicenseRepository.getKeys(product.digitalLicense.id);
  }

  async getAvailableCount(productId: string): Promise<number> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { digitalLicense: true },
    });
    if (!product || !product.digitalLicense) return 0;
    return digitalLicenseRepository.getAvailableKeyCount(product.digitalLicense.id);
  }

  async deleteKey(productId: string, keyId: string, vendorId: string): Promise<void> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { digitalLicense: true },
    });
    if (!product) throw new Error('Product not found');
    if (product.vendorId !== vendorId) throw new Error('Ownership verification failed');

    const key = await digitalLicenseRepository.findKeyById(keyId);
    if (!key) throw new Error('Key not found');
    if (key.isRedeemed) throw new Error('Cannot delete a redeemed key');
    if (key.digitalLicenseId !== product.digitalLicense?.id) throw new Error('Key does not belong to this product');

    await digitalLicenseRepository.deleteKey(keyId);
  }

  async redeemKey(productId: string, userId: string): Promise<LicenseKey | null> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { digitalLicense: true },
    });
    if (!product || !product.digitalLicense) throw new Error('Product or license not found');

    return digitalLicenseRepository.redeemKey(product.digitalLicense.id, userId);
  }
}

export default new LicenseKeyService();
