import prisma from '../config/db';
import { VendorProfile } from '../generated/client';
import { publishProfileCompleted } from '../events/profileCompletedPublisher';

export interface VendorProfileInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  fiscalCode: string;
  businessName: string;
  vatNumber?: string;
  contactEmail: string;
  phoneNumber: string;
  address: Record<string, string>;
}

export class VendorProfileService {
  async getProfile(userId: string): Promise<VendorProfile | null> {
    return prisma.vendorProfile.findUnique({ where: { userId } });
  }

  async upsertProfile(userId: string, data: VendorProfileInput): Promise<VendorProfile> {
    const profile = await prisma.vendorProfile.upsert({
      where: { userId },
      update: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        status: 'COMPLETE',
      },
      create: {
        userId,
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        status: 'COMPLETE',
      },
    });

    // Notify auth-service that the profile is now complete (fire-and-forget)
    publishProfileCompleted(userId).catch(() => {});

    return profile;
  }

  async createPendingProfile(userId: string): Promise<void> {
    // Idempotent: create placeholder only if it doesn't exist
    const exists = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!exists) {
      await prisma.vendorProfile.create({
        data: {
          userId,
          status: 'PENDING',
          firstName: '',
          lastName: '',
          dateOfBirth: new Date('1970-01-01'),
          fiscalCode: `PENDING_${userId.substring(0, 8)}`,
          businessName: '',
          contactEmail: '',
          phoneNumber: '',
          address: {},
        },
      });
    }
  }
}

export default new VendorProfileService();
