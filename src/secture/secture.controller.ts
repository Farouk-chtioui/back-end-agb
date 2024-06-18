import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SecteurService } from "./secture.service";

@Controller('secteur')
export class SecteurController {
    constructor(private readonly secteurService: SecteurService) {}
    @Post()
    async create(@Body() createSecteurDto: { name: string; codesPostaux: string[] }) {
        return this.secteurService.create(createSecteurDto);
    }
    @Get()
    async findAll() {
        return this.secteurService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.secteurService.findOne(id);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSecteurDto: { name?: string; codesPostaux?: string[] }) {
        return this.secteurService.update(id, updateSecteurDto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.secteurService.delete(id);
    }
    
    
}
