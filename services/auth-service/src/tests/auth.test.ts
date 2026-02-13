import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../services/auth.service';

// Mock dependencies
vi.mock('../config/db', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock('../config/redis', () => ({
  default: {
    set: vi.fn().mockResolvedValue('OK'),
    quit: vi.fn().mockResolvedValue('OK'),
  },
}));

vi.mock('../utils/token.util', () => ({
  generateAccessToken: vi.fn().mockReturnValue('mock-access-token'),
  generateRefreshToken: vi.fn().mockReturnValue('mock-refresh-token'),
}));

vi.mock('argon2', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed-password'),
    verify: vi.fn(),
  },
}));

import prisma from '../config/db';
import argon2 from 'argon2';

const authService = new AuthService();

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  passwordHash: 'hashed-password',
  role: 'CUSTOMER',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
};

describe('Auth Service - Registration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue(mockUser);

    const result = await authService.register('test@example.com', 'Password123!');

    expect(result).toHaveProperty('id');
    expect(result.email).toBe('test@example.com');
    expect(result).not.toHaveProperty('passwordHash');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'test@example.com', passwordHash: 'hashed-password' },
    });
  });

  it('should not register a user with an existing email', async () => {
    (prisma.user.findUnique as any).mockResolvedValue(mockUser);

    await expect(authService.register('test@example.com', 'Password123!')).rejects.toThrow(
      'Email already in use'
    );
  });

  it('should validate that register calls findUnique before create', async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue(mockUser);

    await authService.register('test@example.com', 'Password123!');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  describe('Login', () => {
    it('should login an existing user and return tokens', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (argon2.verify as any).mockResolvedValue(true);

      const result = await authService.login('test@example.com', 'Password123!');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user).not.toHaveProperty('passwordHash');
    });

    it('should not login with wrong credentials', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (argon2.verify as any).mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'WrongPassword!')).rejects.toThrow(
        'Invalid credentials'
      );
    });
  });
});
