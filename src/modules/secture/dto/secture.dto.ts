
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateSecteurDto {
  
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    codePostal: number[];

  }