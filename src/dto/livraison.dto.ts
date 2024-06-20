import { IsString, IsNotEmpty, IsMongoId, IsBoolean, IsOptional, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
    @IsMongoId()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
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
    @IsNotEmpty()
    Référence: string;

    @IsString()
    @IsNotEmpty()
    part_du_magasin: string;

    @IsString()
    @IsNotEmpty()
    Observations: string;

    @IsString()
    @IsNotEmpty()
    Date: string;

    @IsString()
    @IsNotEmpty()
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

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}
