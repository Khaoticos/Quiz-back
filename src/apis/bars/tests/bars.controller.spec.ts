import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { BarController } from '../bars.controller';
import { BarService } from '../bars.service';

describe('BarController', () => {
  let controller: BarController;
  let service: BarService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarController],
      providers: [
        {
          provide: BarService,
          useValue: mockService,
        },
      ],
    })
      // mock JwtAuthGuard so controller methods can run without auth
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BarController>(BarController);
    service = module.get<BarService>(BarService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call service.create with dto', async () => {
      const dto = { name: 'New Bar' };
      const result = { id: 1, ...dto };

      mockService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all bars', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      mockService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return bar by id', async () => {
      const result = { id: 1, name: 'Bar' };
      mockService.findById.mockResolvedValue(result);

      expect(await controller.findById(1)).toEqual(result);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update bar', async () => {
      const dto = { name: 'Updated' };
      const result = { id: 1, ...dto };

      mockService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('delete', () => {
    it('should delete bar', async () => {
      const result = { success: true };
      mockService.delete.mockResolvedValue(result);

      expect(await controller.delete(1)).toEqual(result);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
