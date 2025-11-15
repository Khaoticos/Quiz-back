import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { QuizThemeService } from './quiz-theme.service';
import { CreatQuizThemeDto, UpdateQuizThemeDto } from './dtos/quiz-theme.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('quiz-theme')
@Controller('quiz-theme')
export class QuizThemeController {
  constructor(private service: QuizThemeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatQuizThemeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuizThemeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
