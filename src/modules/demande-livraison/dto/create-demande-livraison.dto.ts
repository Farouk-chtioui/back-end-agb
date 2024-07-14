import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsNumber } from 'class-validator';
import { CreateLivraisonDto } from '../../livraision/dto/livraison.dto';

export class CreateDemandeLivraisonDto extends CreateLivraisonDto {

    @IsNumber()
    @IsOptional()
    price: number;
}

export class UpdateDemandeLivraison extends CreateDemandeLivraisonDto {

    @IsMongoId()
    @IsNotEmpty()
    id: string;
}