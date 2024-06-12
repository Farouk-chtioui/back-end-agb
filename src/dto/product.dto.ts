import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class ProdcutCreation {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    image?: string;
  }