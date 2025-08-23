import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BarService } from './bars.service';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('bars')
export class BarsController {
  constructor(private barService: BarService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/create")
  async createBar(@Body() body: { name: string; location: string }) {
    return await this.barService.createBar(body.name, body.location);
  }
}
