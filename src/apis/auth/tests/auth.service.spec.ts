import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

// Mock bcrypt globally (IMPORTANT)
jest.mock('bcrypt', () => ({
  hashSync: jest.fn((pwd) => `hashed-${pwd}`),
  compare: jest.fn(async (raw, hashed) => hashed === `hashed-${raw}`),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'ADMIN_EMAIL') return 'admin@test.com';
      if (key === 'ADMIN_PASSWORD') return 'admin123';
      return null;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateAdmin', () => {
    it('should return false if email does not match admin email', async () => {
      expect(await service.validateAdmin('wrong@test.com', 'admin123')).toBe(
        false,
      );
    });

    it('should return true with correct email and password', async () => {
      expect(await service.validateAdmin('admin@test.com', 'admin123')).toBe(
        true,
      );
    });

    it('should return false for invalid password', async () => {
      expect(await service.validateAdmin('admin@test.com', 'wrong')).toBe(
        false,
      );
    });
  });

  describe('login', () => {
    it('should return access token on valid login', async () => {
      mockJwtService.sign.mockReturnValue('mocked.jwt');

      const result = await service.login('admin@test.com', 'admin123');

      expect(result).toEqual({ access_token: 'mocked.jwt' });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      await expect(service.login('admin@test.com', 'wrong')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
