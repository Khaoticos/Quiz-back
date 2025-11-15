import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { QuizThemeRepository } from '../../../repositories/quiz-theme.repository';
import { CreatQuizThemeDto, UpdateQuizThemeDto } from '../dtos/quiz-theme.dto';
import { QuizThemeService } from '../quiz-theme.service';

describe('QuizThemeService', () => {
  let service: QuizThemeService;
  let repository: jest.Mocked<QuizThemeRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizThemeService,
        {
          provide: QuizThemeRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuizThemeService>(QuizThemeService);
    repository = module.get(QuizThemeRepository);
  });

  describe('create', () => {
    it('should create a quiz theme', async () => {
      const dto: CreatQuizThemeDto = { type: 'Music' };
      const result = { id: 1, ...dto };

      repository.create.mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });


  describe('findAll', () => {
    it('should return all quiz themes', async () => {
      const themes = [{ id: 1 }, { id: 2 }];
      repository.findAll.mockResolvedValue(themes);

      expect(await service.findAll()).toEqual(themes);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });


  describe('findById', () => {
    it('should return a quiz theme by ID', async () => {
      const theme = { id: 1, type: 'Music' };

      repository.findById.mockResolvedValue(theme);

      expect(await service.findById(1)).toEqual(theme);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if theme does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(
        new NotFoundException(`Theme with id 1 not found`),
      );
    });
  });


  describe('update', () => {
    it('should update a quiz theme', async () => {
      const dto: UpdateQuizThemeDto = { type: 'Updated Type' };
      const result = { id: 1, ...dto };

      repository.findById.mockResolvedValue({ id: 1 });
      repository.update.mockResolvedValue(result);

      expect(await service.update(1, dto)).toEqual(result);
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, dto);
    });

    it('should throw NotFoundException when updating non-existent theme', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(1, { type: 'New Type' })).rejects.toThrow(
        new NotFoundException(`Theme with id 1 not found`),
      );
    });
  });


  describe('delete', () => {
    it('should delete a quiz theme', async () => {
      const result = { id: 1 };

      repository.findById.mockResolvedValue({ id: 1 });
      repository.delete.mockResolvedValue(result);

      expect(await service.delete(1)).toEqual(result);
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when deleting non-existent theme', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(
        new NotFoundException(`Theme with id 1 not found`),
      );
    });
  });
});
