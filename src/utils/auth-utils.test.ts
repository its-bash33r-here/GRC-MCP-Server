import { validateAuth, AuthUtils } from './auth-utils';

describe('Auth Utils', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.API_KEY = 'test_key_123';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validateAuth', () => {
    it('should validate correct API key', () => {
      expect(validateAuth('test_key_123')).toBe(true);
    });

    it('should reject incorrect API key', () => {
      expect(validateAuth('wrong_key')).toBe(false);
    });

    it('should reject undefined token', () => {
      expect(validateAuth(undefined)).toBe(false);
    });

    it('should reject null token', () => {
      expect(validateAuth(null)).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validateAuth('')).toBe(false);
    });
  });

  describe('AuthUtils', () => {
    it('should generate token from environment', () => {
      expect(AuthUtils.generateToken()).toBe('test_key_123');
    });

    it('should return empty string when no API key is set', () => {
      delete process.env.API_KEY;
      expect(AuthUtils.generateToken()).toBe('');
    });

    it('should validate token using static method', () => {
      expect(AuthUtils.validateToken('test_key_123')).toBe(true);
      expect(AuthUtils.validateToken('wrong_key')).toBe(false);
    });
  });
});