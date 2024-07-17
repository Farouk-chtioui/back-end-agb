import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateDriverDto {
    @IsNotEmpty()
    @IsMongoId()
    driver: string;
}