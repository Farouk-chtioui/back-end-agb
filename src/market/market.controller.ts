import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MarketService } from './market.service';
import { CreateMarketDto } from 'src/dto/market.dto';
import { UpdateMarketDto } from 'src/dto/updateMarket.dto';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketService.createMarket(createMarketDto);
  }

  @Get()
  findAll(@Query('page') page: number){
    return this.marketService.getsMarkets(page);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marketService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketService.updateUser(id, updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.marketService.deleteUser(id);
  }
  @Get('search/:name')
  async searchMarket(@Param('name') name: string) {
      return this.marketService.searchMarket(name);
  }
  
}