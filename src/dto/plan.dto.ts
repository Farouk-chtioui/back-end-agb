import { IsOptional, ValidateIf, IsMongoId } from "class-validator";

export class CreatePlanDto {
    readonly market: string;

    @IsOptional()
    @ValidateIf((o) => o.secteurMatinal !== '')
    @IsMongoId()
    readonly secteurMatinal: string;

    @IsOptional()
    readonly secteurApresMidi: string;

    readonly Date: string;
    readonly totalMidi: number;
    readonly totalMatin: number;
}