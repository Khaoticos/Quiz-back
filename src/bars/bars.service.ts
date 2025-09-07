import { Injectable, NotFoundException } from '@nestjs/common';
import { BarRepository } from './bars.repository';
import { CreateBarDto, UpdateBarDto } from './dtos/bars.dto';

@Injectable()
export class BarService {
  constructor(private repository: BarRepository) {}

  async create(dto: CreateBarDto) {
    return this.repository.create(dto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const bar = await this.repository.findById(id);
    if (!bar) throw new NotFoundException(`Bar with id ${id} not found`);
    return bar;
  }

  async update(id: number, dto: UpdateBarDto) {
    await this.findById(id);
    return this.repository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
