import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  briefDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  openingHours?: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customUrl?: string;
}

export class UpdateBarDto extends PartialType(CreateBarDto) {}
