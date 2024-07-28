import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientDto } from "../dto/client.dto";
import { Client } from "../schema/client.schema";
import { ClientServiceInterface } from "../interfaces/client.interface";


@Injectable()
export class ClientService implements ClientServiceInterface {
    constructor(
        @InjectModel(Client.name) private clientModel: Model<Client>
    ) {}
    
    async createClient(client: ClientDto): Promise<Client> {
        const createdClient = new this.clientModel(client);
        return createdClient.save();
    }
    async findAll(page: number = 1): Promise<{ clients: Client[], total: number, totalPages: number }> {
        const perPage = 10;  

        const clients = await this.clientModel
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage) 
            .exec();

        const total = await this.clientModel.countDocuments().exec();

        const totalPages = Math.ceil(total / perPage);

        return { clients, total, totalPages };
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
    async getAllClients(): Promise<Client[]> {
        return this.clientModel.find().exec()
        }
        async findById(id: string): Promise<Client> {
            return this.clientModel.findById(id).exec(); // Find client by ID
        }
}