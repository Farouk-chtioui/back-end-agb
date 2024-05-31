import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Market } from '../schema/market.schema';
import { CreateMarketDto } from 'src/dto/market.dto';
import { UpdateMarketDto } from 'src/dto/updateMarket.dto';

@Injectable()
export class MarketService {
  constructor(@InjectModel(Market.name) private marketModel: Model<Market>) {}

 createMarket(createUserDto: CreateMarketDto) {
    const newMarket = new this.marketModel(createUserDto);
    return newMarket.save();
  }

  getsMarkets() {
    return this.marketModel.find()
  }

  getUserById(id: number) {
    return this.marketModel.findById(id);
  }

  updateUser(id: number, updateMarketDto: UpdateMarketDto) {
    return this.marketModel.findByIdAndUpdate(id, updateMarketDto, { new: true });
  }

  deleteUser(id: number) {
    return this.marketModel.findByIdAndDelete(id);
  }
}