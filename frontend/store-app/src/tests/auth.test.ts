import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../lib/validators';

describe('auth validation', () => {
  describe('loginSchema', () => {
    it('should validate a correct login input', () => {
      const input = { email: 'test@example.com', password: 'password123' };
      const result = loginSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const input = { email: 'invalid-email', password: 'password123' };
      const result = loginSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should fail on short password', () => {
      const input = { email: 'test@example.com', password: '123' };
      const result = loginSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('should validate a correct register input', () => {
      const input = {
        firstName: 'Luca',
        lastName: 'Rossi',
        email: 'luca@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should fail if passwords do not match', () => {
      const input = {
        firstName: 'Luca',
        lastName: 'Rossi',
        email: 'luca@example.com',
        password: 'password123',
        confirmPassword: 'mismatch'
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
