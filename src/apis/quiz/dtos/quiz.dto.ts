import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatQuizDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  establishmentId: number;

  @ApiProperty()
  @IsNumber()
  themeId: number;

  @ApiProperty()
  @IsString()
  externalUrl: string;
}

export class UpdateQuizDto extends PartialType(CreatQuizDto) {}
