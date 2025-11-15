import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

// Mock jwt.verify
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockExecutionContext = (authorizationHeader?: string) => {
    const req = {
      headers: {
        authorization: authorizationHeader,
      },
    };

    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as any;
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);

    mockConfigService.get.mockReturnValue('test-secret');
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no Authorization header', () => {
      const context = mockExecutionContext(undefined);

      expect(() => guard.canActivate(context)).toThrow(
        new UnauthorizedException('No token provided'),
      );
    });

    it('should throw UnauthorizedException for invalid token', () => {
      const context = mockExecutionContext('Bearer invalid.token');

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid');
      });

      expect(() => guard.canActivate(context)).toThrow(
        new UnauthorizedException('Invalid token'),
      );
    });

    it('should return true and set req.user when token is valid', () => {
      const payload = { id: 1, email: 'test@test.com' };

      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const context = mockExecutionContext('Bearer valid.token');

      const req = context.switchToHttp().getRequest();

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(jwt.verify).toHaveBeenCalledWith('valid.token', 'test-secret');
      expect(req.user).toEqual(payload);
    });
  });
});
