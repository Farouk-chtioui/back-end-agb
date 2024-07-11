import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Market } from '../schema/market.schema';
import { CreateMarketDto } from '../dto/market.dto';
import { UpdateMarketDto } from '../dto/updateMarket.dto';
import { AuthService } from '../../auth/services/auth.service';
import { LoginDto } from '../../auth/dto/login.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectModel(Market.name) private marketModel: Model<Market>,
    private readonly authService: AuthService,
  ) {}

  async createMarket(createmarketDto: CreateMarketDto) {
    const hashedPassword = await bcrypt.hash(createmarketDto.password, 10);
    const newMarket = new this.marketModel({ ...createmarketDto, password: hashedPassword });
    return newMarket.save();
  }

  async getsMarkets(page: number = 1, limit: number = 6): Promise<Market[]> {
    const skip = (page - 1) * limit;
    return this.marketModel.find().skip(skip).limit(limit).exec();
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

  async searchMarket(searchTerm: string): Promise<Market[]> {
    const regex = new RegExp(searchTerm, 'i');
    return this.marketModel.find({
      $or: [
        { first_name: { $regex: regex } },
        { last_name: { $regex: regex } }
      ]
    }).exec();
  }

  async login(loginDto: LoginDto): Promise<{ token: string, role: string }> {
    return this.authService.login(loginDto);
  }
}
