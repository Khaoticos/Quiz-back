import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private adminEmail: string;
  private adminPasswordHash: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.adminEmail = this.configService.get<string>('ADMIN_EMAIL') as string;
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') as string;
    this.adminPasswordHash = bcrypt.hashSync(adminPassword, 10);
  }

  async validateAdmin(email: string, password: string): Promise<boolean> {
    if (email !== this.adminEmail) return false;
    return await bcrypt.compare(password, this.adminPasswordHash);
  }

  async login(email: string, password: string) {
    const isValid = await this.validateAdmin(email, password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { email, role: 'admin' };
    return { access_token: this.jwtService.sign(payload) };
  }
}
