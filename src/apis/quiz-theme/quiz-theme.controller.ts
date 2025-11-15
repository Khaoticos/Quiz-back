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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { QuizThemeService } from './quiz-theme.service';
import { CreatQuizThemeDto, UpdateQuizThemeDto } from './dtos/quiz-theme.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('quiz-theme')
@Controller('quiz-theme')
export class QuizThemeController {
  constructor(private service: QuizThemeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Create a new quiz theme' })
  @ApiResponse({
    status: 201,
    description: 'Quiz theme successfully created',
    schema: {
      example: {
        id: 1,
        type: 'Science',
      },
    },
  })
  create(@Body() dto: CreatQuizThemeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all quiz themes' })
  @ApiResponse({
    status: 200,
    description: 'Array of quiz themes',
    schema: {
      example: [
        { id: 1, type: 'Science' },
        { id: 2, type: 'Movies' },
      ],
    },
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz theme by ID' })
  @ApiResponse({
    status: 200,
    description: 'Found quiz theme',
    schema: {
      example: {
        id: 1,
        type: 'Science',
        quizes: [
          {
            id: 1,
            title: 'teste quiz',
            establishmentId: 1,
            description: null,
            themeId: 1,
            externalUrl: 'http://tests',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Theme not found',
  })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Update a quiz theme' })
  @ApiResponse({
    status: 200,
    description: 'Updated quiz theme',
    schema: {
      example: { id: 1, type: 'Updated Theme Name' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Theme not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuizThemeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Delete a quiz theme' })
  @ApiResponse({
    status: 200,
    description: 'Theme deleted successfully',
    schema: {
      example: { message: 'Quiz theme deleted successfully' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Theme not found',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
