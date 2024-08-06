import { IsDateString, IsOptional, IsArray, IsNumber, IsString, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Secteur } from '../../secture/schema/secteurs.schema';

export class UpdatePlanDto {
  @IsOptional()
  @IsDateString()
  Date?: string;

  @IsOptional()
  @IsMongoId()
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
