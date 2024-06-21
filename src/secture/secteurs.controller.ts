import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SecteurService } from "./secteurs.service";

@Controller('secture')
export class SecteurController {
    constructor(private readonly secteurService: SecteurService) {}
    @Post()
    async create(@Body() createSecteurDto: { name: string; codesPostaux: string[] }) {
        return this.secteurService.create(createSecteurDto);
    }
    @Get()
    async findAll(@Query('page') page:number ) {
        return this.secteurService.findAll(page);
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
