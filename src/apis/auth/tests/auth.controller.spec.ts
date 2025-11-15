import { Test, TestingModule } from '@nestjs/testing';

import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call AuthService.login and return token', async () => {
      const dto = { email: 'admin@test.com', password: '123456' };
      const result = { access_token: 'mocked.token' };

      mockAuthService.login.mockResolvedValue(result);

      expect(await controller.login(dto)).toEqual(result);

      expect(mockAuthService.login).toHaveBeenCalledWith(
        dto.email,
        dto.password,
      );
    });

    it('should throw UnauthorizedException when service throws', async () => {
      const dto = { email: 'wrong@test.com', password: 'wrong' };

      mockAuthService.login.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
