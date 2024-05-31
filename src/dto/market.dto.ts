import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';

export class CreateMarketDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;
    @IsNotEmpty()
    @IsString()
    last_name: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsString()
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    @IsString()
    password: string;
  }