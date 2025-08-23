import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class BarService {
  constructor(private supabaseService: SupabaseService) {}

  async createBar(name: string, location: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('bars')
      .insert([{ name, location }])
      .select();

    if (error) throw error;
    return data;
  }
}
