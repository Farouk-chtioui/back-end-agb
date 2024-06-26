import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { LivraisonService } from '../services/livraision.service';
import { CreateLivraisonDto } from '../dto/livraison.dto';
import { Livraison } from '../schema/livraision.schema';

@Controller('livraison')
export class LivraisonController {
    constructor(private readonly livraisonService: LivraisonService) {}

    @Post()
    async create(@Body() createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonService.create(createLivraisonDto);
    }

    @Get()
    async findAll(): Promise<Livraison[]> {
        return this.livraisonService.findAll();
    }
    @Get(':NumeroCommande')
    async findByCommande(@Param('NumeroCommande') NumeroCommande: string): Promise<Livraison[]> {
        return this.livraisonService.findByCommande(NumeroCommande);
    }
    @Post(':id/:status')
    async updateStatus(@Param('id') id: string, @Param('status') status: string): Promise<Livraison> {
        return this.livraisonService.updateStatus(id, status);
    }
    @Delete(':id')
    async deleteCommande(@Param('id') id: string): Promise<Livraison> {
        return this.livraisonService.deleteCommande(id);
    }
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Livraison> {
        return this.livraisonService.findById(id);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonService.updateCommande(id, updateLivraisonDto);
    }
}
