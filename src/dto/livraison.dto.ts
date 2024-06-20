import { IsString, IsNotEmpty, IsArray, IsMongoId, IsBoolean, IsOptional, IsNumber } from 'class-validator';

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
    @IsMongoId({ each: true })
    products: string[];


    @IsNotEmpty()
    @IsMongoId({ each: true })
    market: string;


    @IsNotEmpty()
    @IsMongoId({ each: true })
    driver: string;

    @IsBoolean()
    @IsNotEmpty()
    status: Boolean;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    @IsOptional()
    @IsBoolean()
    Dépôt: boolean;
    @IsOptional()
    @IsBoolean()
    Montage: boolean;
    @IsOptional()
    @IsBoolean()
    Install: boolean;

}
