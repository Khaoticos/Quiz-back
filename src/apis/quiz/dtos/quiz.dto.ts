import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatQuizDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  establishmentId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  themeId?: number;

  @ApiProperty()
  @IsString()
  externalUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateQuizDto extends PartialType(CreatQuizDto) {}
