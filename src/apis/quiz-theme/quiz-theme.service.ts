import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizThemeRepository } from '../../repositories/quiz-theme.repository';
import { CreatQuizThemeDto, UpdateQuizThemeDto } from './dtos/quiz-theme.dto';

@Injectable()
export class QuizThemeService {
  constructor(private repository: QuizThemeRepository) {}

  async create(dto: CreatQuizThemeDto) {
    return this.repository.create(dto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const bar = await this.repository.findById(id);
    if (!bar) throw new NotFoundException(`Theme with id ${id} not found`);
    return bar;
  }

  async update(id: number, dto: UpdateQuizThemeDto) {
    await this.findById(id);
    return this.repository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
