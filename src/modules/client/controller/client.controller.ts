import { Controller, Post, Body, Get, Param, Patch, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientDto } from '../dto/client.dto';
import { Client } from '../schema/client.schema';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() client: ClientDto) {
        console.log('Creating client:', client);
        return this.clientService.createClient(client);
    }

    @Get()
    async findAll(@Query('page') page: number = 1) {
        console.log('Fetching all clients, page:', page);
        return this.clientService.findAll(page);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() client: Partial<Client>) {
        console.log('Updating client with ID:', id);
        console.log('Update Payload:', client);
        const updatedClient = await this.clientService.update(id, client);
        console.log('Updated Client:', updatedClient);
        return updatedClient;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        console.log('Deleting client with ID:', id);
        const deletedClient = await this.clientService.delete(id);
        console.log('Deleted Client:', deletedClient);
        return deletedClient;
    }

    @Get('search/:name')
    async searchClient(@Param('name') name: string) {
        console.log('Searching for client with name:', name);
        return this.clientService.searchClient(name);
    }

    @Get('all')
    async getAllClients() {
        console.log('Fetching all clients');
        return this.clientService.getAllClients();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Client> {
        console.log('Fetching client by ID:', id);
        return this.clientService.findById(id);
    }
}
