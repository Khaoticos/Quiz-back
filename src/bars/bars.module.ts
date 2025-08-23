import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';
import { BarService } from './bars.service';
import { BarsController } from './bars.controller';

@Module({
  imports: [SupabaseModule],
  providers: [BarService],
  controllers: [BarsController],
})
export class BarModule {}
