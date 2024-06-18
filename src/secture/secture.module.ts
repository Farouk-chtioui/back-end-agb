import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Secteur, SecteurSchema } from "src/schema/secture.schema";
import { SecteurService } from "./secture.service";
import { SecteurController } from "./secture.controller";


@Module({
    imports: [MongooseModule.forFeature([{ name: Secteur.name, schema: SecteurSchema }])],
    controllers: [SecteurController],
    providers: [SecteurService],
})
export class SecteurModule{}