import { IsOptional, IsMongoId, IsArray } from 'class-validator';

export class CreatePlanDto {
    readonly market: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly secteurMatinal: string[];

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly secteurApresMidi: string[];

    readonly Date: string;
    readonly totalMidi: number;
    readonly totalMatin: number;
}
