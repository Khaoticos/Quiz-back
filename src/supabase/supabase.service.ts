import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.client = createClient(
      this.configService.get<string>('SUPABASE_URL') as string,
      this.configService.get<string>('SUPABASE_KEY') as string,
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
