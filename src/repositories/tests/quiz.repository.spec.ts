import { Test, TestingModule } from '@nestjs/testing';

import { CreatQuizDto, UpdateQuizDto } from 'src/apis/quiz/dtos/quiz.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizRepository } from '../quiz.repository';

describe('QuizRepository', () => {
  let repository: QuizRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const prismaMock = {
      quiz: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    repository = module.get<QuizRepository>(QuizRepository);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    it('should create a quiz', async () => {
      const dto: CreatQuizDto = {
        title: 'Quiz title',
        establishmentId: 1,
        themeId: 2,
        externalUrl: 'http://example.com',
      };

      const expectedResult = { id: 1, ...dto };
      prisma.quiz.create.mockResolvedValue(expectedResult);

      const result = await repository.create(dto);

      expect(prisma.quiz.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all quizzes', async () => {
      const quizzes = [
        { id: 1, title: 'Q1' },
        { id: 2, title: 'Q2' },
      ];

      prisma.quiz.findMany.mockResolvedValue(quizzes);

      const result = await repository.findAll();

      expect(prisma.quiz.findMany).toHaveBeenCalled();
      expect(result).toEqual(quizzes);
    });
  });

  describe('findById', () => {
    it('should return a quiz by id', async () => {
      const quiz = {
        id: 1,
        title: 'Quiz title',
        establishment: { id: 1, name: 'Bar A' },
        theme: { id: 2, type: 'General' },
      };

      prisma.quiz.findUnique.mockResolvedValue(quiz);

      const result = await repository.findById(1);

      expect(prisma.quiz.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { establishment: true, theme: true },
      });
      expect(result).toEqual(quiz);
    });
  });

  describe('update', () => {
    it('should update a quiz', async () => {
      const dto: UpdateQuizDto = {
        title: 'Updated Title',
      };

      const updatedQuiz = { id: 1, title: 'Updated Title' };
      prisma.quiz.update.mockResolvedValue(updatedQuiz);

      const result = await repository.update(1, dto);

      expect(prisma.quiz.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(result).toEqual(updatedQuiz);
    });
  });

  describe('delete', () => {
    it('should delete a quiz', async () => {
      const deletedQuiz = { id: 1 };

      prisma.quiz.delete.mockResolvedValue(deletedQuiz);

      const result = await repository.delete(1);

      expect(prisma.quiz.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(deletedQuiz);
    });
  });
});
