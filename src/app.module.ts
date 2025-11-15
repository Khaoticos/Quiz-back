import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { BarModule } from './apis/bars/bars.module';
import { QuizThemeModule } from './apis/quiz-theme/quiz-theme.module';
import { QuizModule } from './apis/quiz/quiz.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    BarModule,
    QuizThemeModule,
    QuizModule
  ],
})
export class AppModule {}
