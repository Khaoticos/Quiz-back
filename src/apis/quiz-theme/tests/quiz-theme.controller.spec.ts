import { Test, TestingModule } from '@nestjs/testing';

import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { CreatQuizThemeDto, UpdateQuizThemeDto } from '../dtos/quiz-theme.dto';
import { QuizThemeController } from '../quiz-theme.controller';
import { QuizThemeService } from '../quiz-theme.service';

describe('QuizThemeController', () => {
  let controller: QuizThemeController;
  let service: QuizThemeService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  // mock auth guard so all requests pass
  const mockAuthGuard = {
    canActivate: jest.fn((context: ExecutionContext) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizThemeController],
      providers: [
        {
          provide: QuizThemeService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<QuizThemeController>(QuizThemeController);
    service = module.get<QuizThemeService>(QuizThemeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call service.create with dto', async () => {
      const dto: CreatQuizThemeDto = { type: 'science' };
      const result = { id: 1, ...dto };

      mockService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all themes', async () => {
      const result = [
        { id: 1, type: 'science' },
        { id: 2, type: 'history' },
      ];

      mockService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a theme by id', async () => {
      const result = { id: 1, type: 'science' };

      mockService.findById.mockResolvedValue(result);

      expect(await controller.findById(1)).toEqual(result);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto', async () => {
      const dto: UpdateQuizThemeDto = { type: 'updated' };
      const result = { id: 1, ...dto };

      mockService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('delete', () => {
    it('should call service.delete with id', async () => {
      const result = { deleted: true };

      mockService.delete.mockResolvedValue(result);

      expect(await controller.delete(1)).toEqual(result);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
