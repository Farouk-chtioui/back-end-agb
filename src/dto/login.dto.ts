import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginDto {
        @IsString()
        @IsNotEmpty()
    name: string;
        @IsString()
        @IsEmail()
        @IsNotEmpty()
        email: string;
        
        @IsString()
        @IsNotEmpty()
        password: string;
        rememberMe: boolean;
    }
