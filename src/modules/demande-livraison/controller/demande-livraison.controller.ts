import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DemandeLivraisonService } from '../services/demande-livraison.service';
import { CreateDemandeLivraisonDto } from '../dto/create-demande-livraison.dto';
import { UpdateDemandeLivraison } from '../dto/create-demande-livraison.dto.js';

@Controller('demande-livraison')
export class DemandeLivraisonController {
    constructor(private readonly demandeLivraisonService: DemandeLivraisonService) {}

    @Post()
    create(@Body() createDemandeLivraisonDto: CreateDemandeLivraisonDto) {
        return this.demandeLivraisonService.create(createDemandeLivraisonDto);
    }

    @Get()
    findAll() {
        return this.demandeLivraisonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.demandeLivraisonService.findOne(id);
    }

    /*@Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body() updateDemandeLivraisonStatusDto: UpdateDemandeLivraisonStatusDto) {
        return this.demandeLivraisonService.updateStatus(id, updateDemandeLivraisonStatusDto);
    }*/
   @Patch(':id')
    modifyDemandeLivraison(@Param('id') id: string, @Body() updateDemandeLivraison: UpdateDemandeLivraison) {
        return this.demandeLivraisonService.modifyDemandeLivraison(id, updateDemandeLivraison);
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.demandeLivraisonService.delete(id);
    }
}
