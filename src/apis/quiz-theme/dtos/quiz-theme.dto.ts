import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatQuizThemeDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageId?: string;
}

export class UpdateQuizThemeDto extends PartialType(CreatQuizThemeDto) {}
