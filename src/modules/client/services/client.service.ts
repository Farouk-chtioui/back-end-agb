import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientDto } from "../dto/client.dto";
import { Client } from "../schema/client.schema";


@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client.name) private clientModel: Model<Client>
    ) {}
    
    async createClient(client: ClientDto): Promise<Client> {
        const createdClient = new this.clientModel(client);
        return createdClient.save();
    }
    
    async findAll(page: number = 1): Promise<Client[]> {
        const perPage = 10;
        const clients = await this.clientModel
        .find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
        return clients;
    }
    
    async findOne(id: string): Promise<Client> {
        return this.clientModel.findById(id);
    }
    async update(id: string, client: Client): Promise<Client> {
        return this.clientModel.findByIdAndUpdate
        (id, client, { new: true }).exec();
    }
    async delete(id: string): Promise<Client> {
        return this.clientModel.findByIdAndDelete(id).exec();
    }
    async searchClient(searchTerm: string): Promise<Client[]> {
        const regex = new RegExp(searchTerm, 'i');
        return this.clientModel.find({
            $or: [
                { first_name: { $regex: regex } },
                { last_name: { $regex: regex } }
            ]
        }).exec();
    }
}