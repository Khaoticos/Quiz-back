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
  ApiBody,
} from '@nestjs/swagger';

import { BarService } from './bars.service';
import { CreateBarDto, UpdateBarDto } from './dtos/bars.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('bars')
@Controller('bars')
export class BarController {
  constructor(private service: BarService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Create a new bar establishment' })
  @ApiBody({
    type: CreateBarDto,
    examples: {
      example: {
        summary: 'Create a new bar',
        value: {
        name: 'Pub House',
        type: 'Pub',
        description: 'A cool bar with live music',
        openingHours: '18:00 - 04:00',
        address: '123 Main St',
        phone: '+1 555-1234',
        email: 'contact@pubhouse.com',
        customUrl: 'pub-house',
        imageId: 'image-id-1',}}}})
  @ApiResponse({
    status: 201,
    description: 'Bar successfully created',
    schema: {
      example: {
        id: 1,
        name: 'Pub House',
        type: 'Pub',
        description: 'A cool bar with live music',
        openingHours: '18:00 - 04:00',
        address: '123 Main St',
        phone: '+1 555-1234',
        email: 'contact@pubhouse.com',
        customUrl: 'pub-house',
        imageId: 'image-id-1',
        createdAt: '2024-01-01T12:00:00.000Z',
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
  create(@Body() dto: CreateBarDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all bars' })
  @ApiResponse({
    status: 200,
    description: 'List of all bars',
    schema: {
      example: [
        {
          id: 1,
          name: 'Pub House',
          type: 'Pub',
          description: 'A cool bar with live music',
          openingHours: '18:00 - 04:00',
          address: '123 Main St',
          phone: '+1 555-1234',
          email: 'contact@pubhouse.com',
          customUrl: 'pub-house',
          createdAt: '2024-01-01T12:00:00.000Z',
          imageId: 'image-id-1',
        },
      ],
    },
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find bar by ID' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'Pub House',
        type: 'Pub',
        description: 'A cool bar with live music',
        openingHours: '18:00 - 04:00',
        address: '123 Main St',
        phone: '+1 555-1234',
        email: 'contact@pubhouse.com',
        customUrl: 'pub-house',
        createdAt: '2024-01-01T12:00:00.000Z',
        imageId: 'image-id-1',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Bar not found' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Update bar details' })
  @ApiResponse({
    status: 200,
    description: 'Bar updated',
    schema: {
      example: {
        id: 1,
        name: 'Pub House Updated',
        type: 'Pub',
        description: 'A cool bar with live music',
        openingHours: '18:00 - 04:00',
        address: '123 Main St',
        phone: '+1 555-1234',
        email: 'contact@pubhouse.com',
        customUrl: 'pub-house',
        imageId: 'image-id-1',
        createdAt: '2024-01-01T12:00:00.000Z',
      },
    },
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBarDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Delete a bar' })
  @ApiResponse({
    status: 200,
    description: 'Bar deleted',
    schema: {
      example: { message: 'Bar deleted successfully' },
    },
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
