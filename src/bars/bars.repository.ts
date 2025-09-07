import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarDto, UpdateBarDto } from './dtos/bars.dto';

@Injectable()
export class BarRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBarDto) {
    return this.prisma.bar.create({ data });
  }

  findAll() {
    return this.prisma.bar.findMany();
  }

  findById(id: number) {
    return this.prisma.bar.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateBarDto) {
    return this.prisma.bar.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.bar.delete({ where: { id } });
  }
}
