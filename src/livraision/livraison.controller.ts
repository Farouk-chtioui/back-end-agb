import { Controller, Get, Post, Body } from '@nestjs/common';
import { LivraisonService } from './livraision.service';
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
    @Get('commande/:NumeroCommande')
    async findbycommande(@Body() NumeroCommande: string): Promise<Livraison> {
        return this.livraisonService.findbycommande(NumeroCommande);
    }
}
