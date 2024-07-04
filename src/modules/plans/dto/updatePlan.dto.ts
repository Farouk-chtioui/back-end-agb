// updatePlan.dto.ts
import { IsDateString, IsNotEmpty, IsArray, IsOptional, IsNumber, IsString, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Secteur } from '../../secture/schema/secteurs.schema';
import { Market } from '../../market/schema/market.schema';

export class UpdatePlanDto {
  @IsOptional()
  @IsDateString()
  Date?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid market ID' })
  market?: string | null;

  @IsOptional()
  @IsArray()
  @Type(() => Secteur)
  secteurMatinal?: Secteur[];

  @IsOptional()
  @IsArray()
  @Type(() => Secteur)
  secteurApresMidi?: Secteur[];

  @IsOptional()
  @IsNumber()
  totalMatin?: number;

  @IsOptional()
  @IsNumber()
  totalMidi?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
