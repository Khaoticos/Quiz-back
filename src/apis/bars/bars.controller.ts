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

import { BarService } from './bars.service';
import { CreateBarDto, UpdateBarDto } from './dtos/bars.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('bars')
@Controller('bars')
export class BarController {
  constructor(private service: BarService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateBarDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBarDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
