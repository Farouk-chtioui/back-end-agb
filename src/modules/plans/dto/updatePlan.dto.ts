import { IsOptional, IsString, IsDateString, IsMongoId, ValidateIf, IsNumber } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  readonly market?: string;

  @IsOptional()
  @ValidateIf((o) => o.secteurMatinal !== '')
  @IsMongoId()
  readonly secteurMatinal?: string;

  @IsOptional()
  @ValidateIf((o) => o.secteurApresMidi !== '')
  @IsString()
  readonly secteurApresMidi?: string;

  @IsOptional()
  @IsDateString()
  readonly Date?: string;

  @IsOptional()
  @IsNumber()
  readonly totalMidi?: number;

  @IsOptional()
  @IsNumber()
  readonly totalMatin?: number;
}
