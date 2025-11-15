import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizThemeRepository } from '../quiz-theme.repository';


describe('QuizThemeRepository', () => {
  let repository: QuizThemeRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizThemeRepository,
        {
          provide: PrismaService,
          useValue: {
            quizTheme: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<QuizThemeRepository>(QuizThemeRepository);
    prisma = module.get(PrismaService);
  });


  describe('create', () => {
    it('should create a quizTheme', async () => {
      const dto = { type: 'History' } as any;

      prisma.quizTheme.create.mockResolvedValue({ id: 1, ...dto });

      const result = await repository.create(dto);

      expect(prisma.quizTheme.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual({ id: 1, ...dto });
    });
  });


  describe('findAll', () => {
    it('should return all quizThemes', async () => {
      const quizThemes = [
        { id: 1, type: 'History' },
        { id: 2, type: 'Gossip' },
      ];

      prisma.quizTheme.findMany.mockResolvedValue(quizThemes);

      const result = await repository.findAll();

      expect(prisma.quizTheme.findMany).toHaveBeenCalled();
      expect(result).toEqual(quizThemes);
    });
  });

  describe('findById', () => {
    it('should return a quizTheme by id', async () => {
      const quizTheme = { id: 1, type: 'History', quizes: [] };

      prisma.quizTheme.findUnique.mockResolvedValue(quizTheme);

      const result = await repository.findById(1);

      expect(prisma.quizTheme.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { quizes: true },
      });
      expect(result).toEqual(quizTheme);
    });

    it('should return null if quizTheme not found', async () => {
      prisma.quizTheme.findUnique.mockResolvedValue(null);

      const result = await repository.findById(999);

      expect(result).toBeNull();
    });
  });


  describe('update', () => {
    it('should update a quizTheme', async () => {
      const dto = { type: 'History' } as any;
      const updatedquizTheme = { id: 1, type: 'History' };

      prisma.quizTheme.update.mockResolvedValue(updatedquizTheme);

      const result = await repository.update(1, dto);

      expect(prisma.quizTheme.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(result).toEqual(updatedquizTheme);
    });
  });


  describe('delete', () => {
    it('should delete a quizTheme', async () => {
      const deletedquizTheme = { id: 1 };

      prisma.quizTheme.delete.mockResolvedValue(deletedquizTheme);

      const result = await repository.delete(1);

      expect(prisma.quizTheme.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(deletedquizTheme);
    });
  });
});
