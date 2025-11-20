import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatQuizDto, UpdateQuizDto } from 'src/apis/quiz/dtos/quiz.dto';

@Injectable()
export class QuizRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreatQuizDto) {
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key],
    );
    return this.prisma.quiz.create({ data: { title: data.title,
      externalUrl: data.externalUrl,
      description: data.description,
      
      ...(data.establishmentId && { establishmentId: data.establishmentId }),
      ...(data.themeId && { themeId: data.themeId }),}   
    }  
  
    );
  }
  
  findAll() {
    return this.prisma.quiz.findMany();
  }

  findById(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: { establishment: true, theme: true },
    });
  }

  update(id: number, data: UpdateQuizDto) {
    return this.prisma.quiz.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
