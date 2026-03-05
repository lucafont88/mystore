import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VendorProfileService } from '../services/vendorProfile.service';

// Mock Prisma
vi.mock('../config/db', () => ({
  default: {
    vendorProfile: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Mock publisher
vi.mock('../events/profileCompletedPublisher', () => ({
  publishProfileCompleted: vi.fn().mockResolvedValue(undefined),
}));

import prisma from '../config/db';
import { publishProfileCompleted } from '../events/profileCompletedPublisher';

const service = new VendorProfileService();

const mockProfile = {
  id: 'profile-1',
  userId: 'user-1',
  status: 'COMPLETE' as const,
  firstName: 'Mario',
  lastName: 'Rossi',
  dateOfBirth: new Date('1990-01-15'),
  gender: 'M',
  fiscalCode: 'RSSMRA90A15H501Z',
  businessName: 'Mario Rossi SRL',
  vatNumber: '12345678901',
  contactEmail: 'mario@example.com',
  phoneNumber: '+393331234567',
  address: { street: 'Via Roma 1', city: 'Roma', postalCode: '00100', country: 'IT' },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const validInput = {
  firstName: 'Mario',
  lastName: 'Rossi',
  dateOfBirth: '1990-01-15',
  gender: 'M',
  fiscalCode: 'RSSMRA90A15H501Z',
  businessName: 'Mario Rossi SRL',
  vatNumber: '12345678901',
  contactEmail: 'mario@example.com',
  phoneNumber: '+393331234567',
  address: { street: 'Via Roma 1', city: 'Roma', postalCode: '00100', country: 'IT' },
};

describe('VendorProfileService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProfile', () => {
    it('returns null when profile does not exist', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(null);
      const result = await service.getProfile('user-1');
      expect(result).toBeNull();
    });

    it('returns the profile when it exists', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(mockProfile);
      const result = await service.getProfile('user-1');
      expect(result).toEqual(mockProfile);
    });
  });

  describe('upsertProfile', () => {
    it('upserts profile and returns it', async () => {
      vi.mocked(prisma.vendorProfile.upsert).mockResolvedValue(mockProfile);
      const result = await service.upsertProfile('user-1', validInput);
      expect(result).toEqual(mockProfile);
      expect(prisma.vendorProfile.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1' },
          update: expect.objectContaining({ status: 'COMPLETE', firstName: 'Mario' }),
          create: expect.objectContaining({ userId: 'user-1', status: 'COMPLETE' }),
        })
      );
    });

    it('publishes profile.completed event after upsert', async () => {
      vi.mocked(prisma.vendorProfile.upsert).mockResolvedValue(mockProfile);
      await service.upsertProfile('user-1', validInput);
      expect(publishProfileCompleted).toHaveBeenCalledWith('user-1');
    });
  });

  describe('createPendingProfile', () => {
    it('creates pending profile if none exists', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.vendorProfile.create).mockResolvedValue({ ...mockProfile, status: 'PENDING' });
      await service.createPendingProfile('user-1');
      expect(prisma.vendorProfile.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ userId: 'user-1', status: 'PENDING' }),
        })
      );
    });

    it('skips creation if profile already exists', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(mockProfile);
      await service.createPendingProfile('user-1');
      expect(prisma.vendorProfile.create).not.toHaveBeenCalled();
    });
  });
});
