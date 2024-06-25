import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ClientDto{
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @IsNotEmpty()
    @IsString()
    last_name: string;
    @IsNotEmpty()
    @IsString()
    address1: string;
    @IsOptional()
    @IsString()
    address2: string;
    @IsNotEmpty()
    @IsString()
    
    phone: string;
}