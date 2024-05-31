import { IsOptional, IsString } from 'class-validator';

export class UpdateMarketDto {
  @IsString()
  @IsOptional()
   email?: string;

  @IsString()
  @IsOptional()
   address?: string;

  @IsString()
  @IsOptional()
   password?: string;
}