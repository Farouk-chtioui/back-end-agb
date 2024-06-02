import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class DriverDto {
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
