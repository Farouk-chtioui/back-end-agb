import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  findAll() {
    return this.marketService.getsMarkets();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketService.updateUser(id, updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketService.deleteUser(id);
  }
}