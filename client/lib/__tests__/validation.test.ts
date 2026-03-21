import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePasswordMatch,
} from '../validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should accept valid email', () => {
      const result = validateEmail('user@example.com');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should reject invalid email format', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid email format');
    });

    it('should reject email without domain', () => {
      const result = validateEmail('user@');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid email format');
    });
  });

  describe('validatePassword', () => {
    it('should accept valid password', () => {
      const result = validatePassword('Password123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty password', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password is required');
    });

    it('should reject password shorter than 8 characters', () => {
      const result = validatePassword('Pass1');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must be at least 8 characters');
    });

    it('should reject password longer than 128 characters', () => {
      const result = validatePassword('a'.repeat(129));
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must be less than 128 characters');
    });

    it('should reject password without letters', () => {
      const result = validatePassword('12345678');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must contain at least one letter');
    });

    it('should reject password without numbers', () => {
      const result = validatePassword('Password');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must contain at least one number');
    });
  });

  describe('validateUsername', () => {
    it('should accept valid username', () => {
      const result = validateUsername('john_doe123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty username', () => {
      const result = validateUsername('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username is required');
    });

    it('should reject username shorter than 3 characters', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username must be at least 3 characters');
    });

    it('should reject username longer than 32 characters', () => {
      const result = validateUsername('a'.repeat(33));
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username must be less than 32 characters');
    });

    it('should reject username with special characters', () => {
      const result = validateUsername('john-doe');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username can only contain letters, numbers, and underscores');
    });

    it('should reject username with spaces', () => {
      const result = validateUsername('john doe');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username can only contain letters, numbers, and underscores');
    });
  });

  describe('validatePasswordMatch', () => {
    it('should accept matching passwords', () => {
      const result = validatePasswordMatch('Password123', 'Password123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject non-matching passwords', () => {
      const result = validatePasswordMatch('Password123', 'Different123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Passwords do not match');
    });
  });
});
