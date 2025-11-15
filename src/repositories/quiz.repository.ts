import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatQuizDto, UpdateQuizDto } from 'src/apis/quiz/dtos/quiz.dto';


@Injectable()
export class QuizRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreatQuizDto) {
    return this.prisma.quiz.create({ data });
  }

  findAll() {
    return this.prisma.quiz.findMany();
  }

  findById(id: number) {
    return this.prisma.quiz.findUnique({ where: { id }, include:{establishment: true, theme: true} });
  }

  update(id: number, data: UpdateQuizDto) {
    return this.prisma.quiz.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
