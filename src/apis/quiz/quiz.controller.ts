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
import { QuizService } from './quiz.service';
import { CreatQuizDto, UpdateQuizDto } from './dtos/quiz.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private service: QuizService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatQuizDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuizDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
