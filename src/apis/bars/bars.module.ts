import { Module } from '@nestjs/common';

import { BarService } from './bars.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { BarController } from './bars.controller';
import { BarRepository } from '../../repositories/bars.repository';

@Module({
  imports: [PrismaModule],
  providers: [BarService, BarRepository],
  controllers: [BarController],
})
export class BarModule {}
