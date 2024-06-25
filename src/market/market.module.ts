import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Market,MarketSchema } from './schema/market.schema';
import { MarketService } from './services/market.service';
import { MarketController } from './market.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }])],
  providers: [MarketService],
  controllers: [MarketController],
})
export class MarketModule {}