import { Module } from '@nestjs/common';

import { QuizService } from './quiz.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizController } from './quiz.controller';
import { QuizRepository } from '../../repositories/quiz.repository';
import { QuizThemeRepository } from 'src/repositories/quiz-theme.repository';
import { BarRepository } from 'src/repositories/bars.repository';


@Module({
  imports: [PrismaModule],
  providers: [QuizService, QuizRepository, QuizThemeRepository, BarRepository],
  controllers: [QuizController],
})
export class QuizModule {}
