import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
export class UpdateSectureDto {
  
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    codePostal: number[];

  }