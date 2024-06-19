import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

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

    @IsString()
    @IsNotEmpty()
    status: string;
}
