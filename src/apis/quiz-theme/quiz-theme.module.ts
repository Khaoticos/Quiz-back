import { Module } from '@nestjs/common';

import { QuizThemeService } from './quiz-theme.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizThemeController } from './quiz-theme.controller';
import { QuizThemeRepository } from '../../repositories/quiz-theme.repository';

@Module({
  imports: [PrismaModule],
  providers: [QuizThemeService, QuizThemeRepository],
  controllers: [QuizThemeController],
})
export class QuizThemeModule {}
