
import { Controller, Post, Body, Get, Param, Patch, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from 'src/client/dto/client.dto';
import { Client } from 'src/schema/client.schema';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}  
    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() client: ClientDto) {
        return this.clientService.createClient(client);
    }
    @Get()
    async findAll(@Query('page') page: number) {
      return this.clientService.findAll(page);
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.clientService.findOne(id);
    }   
    @Patch(':id')
    async update(@Param('id') id: string, @Body() client: Client) {
        return this.clientService.update(id, client);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.clientService.delete(id);
    }
    @Get('search/:name')
    async searchClient(@Param('name') name: string) {
        return this.clientService.searchClient(name);
    }
  
}