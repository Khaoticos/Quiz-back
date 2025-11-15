import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatQuizThemeDto,
  UpdateQuizThemeDto,
} from 'src/apis/quiz-theme/dtos/quiz-theme.dto';

@Injectable()
export class QuizThemeRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreatQuizThemeDto) {
    return this.prisma.quizTheme.create({ data });
  }

  findAll() {
    return this.prisma.quizTheme.findMany();
  }

  findById(id: number) {
    return this.prisma.quizTheme.findUnique({
      where: { id },
      include: { quizes: true },
    });
  }

  update(id: number, data: UpdateQuizThemeDto) {
    return this.prisma.quizTheme.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.quizTheme.delete({ where: { id } });
  }
}
