import { IsString, IsNotEmpty, IsMongoId, IsBoolean, IsOptional, IsNumber, ValidateNested, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '../../../enums/status.enum';

export class ProductDto {
    @IsMongoId()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsBoolean()
    Dépôt?: boolean;

    @IsOptional()
    @IsBoolean()
    Montage?: boolean;

    @IsOptional()
    @IsBoolean()
    Install?: boolean;
}

export class CreateLivraisonDto {
    @IsString()
    @IsNotEmpty()
    NumeroCommande: string;

    @IsString()
    @IsOptional()
    Référence: string;

    @IsString()
    @IsOptional()
    part_du_magasin: string;

    @IsString()
    @IsOptional()
    Observations: string;

    @IsString()
    @IsNotEmpty()
    Date: string;

    @IsString()
    @IsOptional()
    Periode: string;

    @IsMongoId()
    @IsNotEmpty()
    client: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];

    @IsMongoId()
    @IsNotEmpty()
    market: string;

    @IsMongoId()
    @IsNotEmpty()
    driver: string;

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;
}
