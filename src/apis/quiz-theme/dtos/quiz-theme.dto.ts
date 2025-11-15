import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatQuizThemeDto {
  @ApiProperty()
  @IsString()
  type: string;
}

export class UpdateQuizThemeDto extends PartialType(CreatQuizThemeDto) {}
