// src/modules/market/controllers/market.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MarketService } from '../services/market.service';
import { CreateMarketDto } from '../dto/market.dto';
import { UpdateMarketDto } from '../dto/updateMarket.dto';
import { JwtAuthGuard } from '../../../guard/jwt-auth.guard';
import { RolesGuard } from '../../../guard/roles.guard';
import { RolesDecorator } from '../../../decorators/roles.decorator';
import { LoginDto } from '../../auth/dto/login.dto';
import { Roles } from '../../../enums/roles.enum';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketService.createMarket(createMarketDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Market)
  findAll(@Query('page') page: number) {
    return this.marketService.getsMarkets(page);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Market)
  findOne(@Param('id') id: number) {
    return this.marketService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Market)
  update(@Param('id') id: number, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketService.updateUser(id, updateMarketDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Market)
  remove(@Param('id') id: number) {
    return this.marketService.deleteUser(id);
  }

  @Get('search/:name')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Market)
  async searchMarket(@Param('name') name: string) {
    return this.marketService.searchMarket(name);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.marketService.login(loginDto);
  }
}
