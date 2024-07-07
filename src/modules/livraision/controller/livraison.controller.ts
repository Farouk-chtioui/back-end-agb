import { Controller, Get, Post, Body, Param, Delete, Patch, Put } from '@nestjs/common';
import { LivraisonService } from '../services/livraision.service';
import { CreateLivraisonDto } from '../dto/livraison.dto';
import { UpdateLivraisonStatusDto } from '../dto/update-livraison-status.dto'; // Import the new DTO
import { Livraison } from '../schema/livraision.schema';
import { Status } from '../../../enums/status.enum';

@Controller('livraison')
export class LivraisonController {
    constructor(private readonly livraisonService: LivraisonService) {}

    @Post()
    async create(@Body() createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonService.createLivraison(createLivraisonDto);
    }

    @Get()
    async findAll(): Promise<Livraison[]> {
        return this.livraisonService.findAll();
    }

    @Get(':NumeroCommande')
    async findByCommande(@Param('NumeroCommande') NumeroCommande: string): Promise<Livraison[]> {
        return this.livraisonService.findByCommande(NumeroCommande);
    }

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body() updateLivraisonStatusDto: UpdateLivraisonStatusDto): Promise<Livraison> {
        const { status } = updateLivraisonStatusDto;
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

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonService.updateCommande(id, updateLivraisonDto);
    }
    @Get('search/:search')
    async searchLivraison(@Param('search') search: string): Promise<Livraison[]> {
        return this.livraisonService.searchLivraison(search);
    }
}
