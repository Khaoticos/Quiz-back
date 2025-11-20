import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../../repositories/quiz.repository';
import { CreatQuizDto, UpdateQuizDto } from './dtos/quiz.dto';
import { BarRepository } from '../../repositories/bars.repository';
import { QuizThemeRepository } from '../../repositories/quiz-theme.repository';

@Injectable()
export class QuizService {
  constructor(
    private quizRepository: QuizRepository,
    private barRepository: BarRepository,
    private quizThemRepository: QuizThemeRepository,
  ) {}

  async create(dto: CreatQuizDto) {
    if (dto.establishmentId) {
      const bar = await this.barRepository.findById(dto.establishmentId);
      if (!bar)
        throw new NotFoundException(
          `Bar with id ${dto.establishmentId} not found`,
        );
    }

    if (dto.themeId) {
      const theme = await this.quizThemRepository.findById(dto.themeId);
      if (!theme)
        throw new NotFoundException(`Theme with id ${dto.themeId} not found`);
    }
    
    return this.quizRepository.create(dto);
  }

  async findAll() {
    return this.quizRepository.findAll();
  }

  async findById(id: number) {
    const quiz = await this.quizRepository.findById(id);
    if (!quiz) throw new NotFoundException(`Quiz with id ${id} not found`);
    return quiz;
  }

  async update(id: number, dto: UpdateQuizDto) {
    await this.findById(id);
    return this.quizRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.quizRepository.delete(id);
  }
}
