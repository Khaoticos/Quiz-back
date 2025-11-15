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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

import { QuizService } from './quiz.service';
import { CreatQuizDto, UpdateQuizDto } from './dtos/quiz.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private service: QuizService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreatQuizDto,
    examples: {
      example: {
        summary: 'Create a new quiz',
        value: {
          title: 'Trivia Night',
          description: 'A general knowledge quiz',
          themeId: 1,
          establishmentId: 3,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Quiz created successfully',
    schema: {
      example: {
        id: 10,
        title: 'Trivia Night',
        description: 'A general knowledge quiz',
        themeId: 1,
        establishmentId: 3,
        createdAt: '2025-01-01T12:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Bar or Theme not found',
  })
  create(@Body() dto: CreatQuizDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List all quizzes',
    schema: {
      example: [
        {
          id: 1,
          title: 'Movie Quiz',
          description: 'Quiz about famous movies',
          themeId: 2,
          establishmentId: 5,
        },
        {
          id: 2,
          title: 'History Quiz',
          description: 'General history questions',
          themeId: 1,
          establishmentId: 3,
        },
      ],
    },
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Quiz found',
    schema: {
      example: {
        id: 2,
        title: 'teste quiz 2',
        establishmentId: 2,
        description: null,
        themeId: 2,
        externalUrl: 'http://tests',
        establishment: {
          id: 2,
          name: 'teste name bar',
          type: 'Piriguete',
          createdAt: '2025-11-15T13:34:49.459Z',
          fullDescription: null,
          briefDescription: null,
          openingHours: null,
          address: null,
          phone: null,
          email: null,
          customUrl: null,
        },
        theme: {
          id: 2,
          type: 'gossip',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Quiz not found',
  })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdateQuizDto,
    examples: {
      example: {
        summary: 'Update a quiz',
        value: {
          title: 'Updated Trivia Night',
          description: 'Updated description',
          themeId: 2,
          establishmentId: 3,
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Quiz updated successfully',
    schema: {
      example: {
        id: 10,
        title: 'Updated Trivia Night',
        description: 'Updated description',
        themeId: 2,
        establishmentId: 3,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Quiz not found',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuizDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Quiz deleted successfully',
    schema: {
      example: {
        message: 'Quiz deleted successfully',
        id: 10,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Quiz not found',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
