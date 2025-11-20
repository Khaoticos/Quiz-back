import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { BarRepository } from '../../../repositories/bars.repository';
import { QuizThemeRepository } from '../../../repositories/quiz-theme.repository';
import { QuizRepository } from '../../../repositories/quiz.repository';
import { CreatQuizDto, UpdateQuizDto } from '../dtos/quiz.dto';
import { QuizService } from '../quiz.service';

describe('QuizService', () => {
  let service: QuizService;
  let quizRepo: jest.Mocked<QuizRepository>;
  let barRepo: jest.Mocked<BarRepository>;
  let themeRepo: jest.Mocked<QuizThemeRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: QuizRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: BarRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: QuizThemeRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    quizRepo = module.get(QuizRepository);
    barRepo = module.get(BarRepository);
    themeRepo = module.get(QuizThemeRepository);
  });

  describe('create', () => {
    it('should create a quiz when bar and theme exist', async () => {
      const dto: CreatQuizDto = {
        title: 'Test Quiz',
        establishmentId: 1,
        themeId: 2,
        externalUrl: 'http://example.com',
      };

      barRepo.findById.mockResolvedValue({ id: 1 });
      themeRepo.findById.mockResolvedValue({ id: 2 });
      quizRepo.create.mockResolvedValue({ id: 10, ...dto });

      const result = await service.create(dto);

      expect(barRepo.findById).toHaveBeenCalledWith(1);
      expect(themeRepo.findById).toHaveBeenCalledWith(2);
      expect(quizRepo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 10, ...dto });
    });

    it('should throw NotFoundException if bar does not exist an establishmentId is passed', async () => {
      const dto: CreatQuizDto = {
        title: 'Quiz',
        establishmentId: 999,
        themeId: 1,
        externalUrl: 'http://example.com',
      };

      barRepo.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        new NotFoundException(`Bar with id 999 not found`),
      );
    });

    it('should throw NotFoundException if theme does not exist and themeId is passed', async () => {
      const dto: CreatQuizDto = {
        title: 'Quiz',
        establishmentId: 1,
        themeId: 999,
        externalUrl: 'http://example.com',
      };

      barRepo.findById.mockResolvedValue({ id: 1 });
      themeRepo.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        new NotFoundException(`Theme with id 999 not found`),
      );
    });
  });

  describe('findAll', () => {
    it('should return all quizzes', async () => {
      const quizzes = [{ id: 1 }, { id: 2 }];
      quizRepo.findAll.mockResolvedValue(quizzes);

      const result = await service.findAll();

      expect(quizRepo.findAll).toHaveBeenCalled();
      expect(result).toEqual(quizzes);
    });
  });

  describe('findById', () => {
    it('should return a quiz', async () => {
      const quiz = { id: 1, title: 'Quiz' };

      quizRepo.findById.mockResolvedValue(quiz);

      const result = await service.findById(1);

      expect(quizRepo.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(quiz);
    });

    it('should throw NotFoundException if quiz does not exist', async () => {
      quizRepo.findById.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(
        new NotFoundException(`Quiz with id 1 not found`),
      );
    });
  });

  describe('update', () => {
    it('should update a quiz', async () => {
      const dto: UpdateQuizDto = { title: 'Updated' };

      quizRepo.findById.mockResolvedValue({ id: 1 }); // required by service
      quizRepo.update.mockResolvedValue({ id: 1, ...dto });

      const result = await service.update(1, dto);

      expect(quizRepo.findById).toHaveBeenCalledWith(1);
      expect(quizRepo.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ id: 1, ...dto });
    });

    it('should throw NotFoundException when updating a nonexistent quiz', async () => {
      quizRepo.findById.mockResolvedValue(null);

      await expect(service.update(1, {})).rejects.toThrow(
        new NotFoundException(`Quiz with id 1 not found`),
      );
    });
  });

  describe('delete', () => {
    it('should delete a quiz', async () => {
      quizRepo.findById.mockResolvedValue({ id: 1 });
      quizRepo.delete.mockResolvedValue({ id: 1 });

      const result = await service.delete(1);

      expect(quizRepo.findById).toHaveBeenCalledWith(1);
      expect(quizRepo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw NotFoundException when deleting a nonexistent quiz', async () => {
      quizRepo.findById.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(
        new NotFoundException(`Quiz with id 1 not found`),
      );
    });
  });
});
