import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { Client,ClientSchema } from "src/schema/client.schema";



@Module({
    imports:[MongooseModule.forFeature([{name: Client.name, schema: ClientSchema}])],
    providers:[ClientService],
    controllers:[ClientController]
})
export class ClientModule {}
