import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketModule } from './market/market.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Agb'),
  MarketModule


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
