import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientService } from "./services/client.service";
import { ClientController } from "./client.controller";
import { Client,ClientSchema } from "src/client/schema/client.schema";



@Module({
    imports:[MongooseModule.forFeature([{name: Client.name, schema: ClientSchema}])],
    providers:[ClientService],
    controllers:[ClientController]
})
export class ClientModule {}
