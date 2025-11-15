import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from '../quiz.controller';
import { QuizService } from '../quiz.service';
import { CreatQuizDto, UpdateQuizDto } from '../dtos/quiz.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

// Mock JwtAuthGuard to always allow requests
const mockJwtAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => true),
};

describe('QuizController', () => {
  let controller: QuizController;
  let service: jest.Mocked<QuizService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: QuizService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<QuizController>(QuizController);
    service = module.get(QuizService);
  });


  describe('create', () => {
    it('should call service.create with DTO', async () => {
      const dto: CreatQuizDto = {
        title: 'Quiz Title',
        establishmentId: 1,
        themeId: 2,
        externalUrl: 'http://test.com',
      };

      const result = { id: 1, ...dto };
      service.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });


  describe('findAll', () => {
    it('should return all quizzes', async () => {
      const quizzes = [{ id: 1 }, { id: 2 }];
      service.findAll.mockResolvedValue(quizzes);

      expect(await controller.findAll()).toEqual(quizzes);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return quiz by ID', async () => {
      const quiz = { id: 1, title: 'Test Quiz' };

      service.findById.mockResolvedValue(quiz);

      expect(await controller.findById(1)).toEqual(quiz);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });


  describe('update', () => {
    it('should update quiz', async () => {
      const dto: UpdateQuizDto = { title: 'Updated' };
      const result = { id: 1, ...dto };

      service.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });


  describe('delete', () => {
    it('should delete quiz', async () => {
      const result = { id: 1 };

      service.delete.mockResolvedValue(result);

      expect(await controller.delete(1)).toEqual(result);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
