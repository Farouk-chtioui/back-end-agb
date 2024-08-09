import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Market } from '../schema/market.schema';
import { CreateMarketDto } from '../dto/market.dto';
import { UpdateMarketDto } from '../dto/updateMarket.dto';
import { AuthService } from '../../auth/services/auth.service';
import { MarketServiceInterface } from '../interfaces/market.interface';
import { LoginDto } from '../../auth/dto/login.dto';
import { GeocodingService } from '../../geocoding/services/geocoding.service';  // Import GeocodingService

@Injectable()
export class MarketService implements MarketServiceInterface {
  constructor(
    @InjectModel(Market.name) private marketModel: Model<Market>,
    private readonly authService: AuthService,
    private readonly geocodingService: GeocodingService,  // Inject GeocodingService
  ) {}

  async createMarket(createMarketDto: CreateMarketDto) {
    const hashedPassword = await bcrypt.hash(createMarketDto.password, 10);

    // Fetch coordinates using GeocodingService
    const { latitude, longitude } = await this.geocodingService.getCoordinates(createMarketDto.address);

    const newMarket = new this.marketModel({ 
      ...createMarketDto, 
      password: hashedPassword,
      numberMaInitial: createMarketDto.numberMa, // Set initial values
      numberMiInitial: createMarketDto.numberMi, // Set initial values
      latitude,  // Store latitude
      longitude, // Store longitude
    });

    return newMarket.save();
  }

  async updateUser(id: number, updateMarketDto: UpdateMarketDto) {
    // Fetch coordinates if address is updated
    if (updateMarketDto.address) {
      const { latitude, longitude } = await this.geocodingService.getCoordinates(updateMarketDto.address);
      updateMarketDto.latitude = latitude;
      updateMarketDto.longitude = longitude;
    }

    return this.marketModel.findByIdAndUpdate(id, updateMarketDto, { new: true });
  }

  async getsMarkets(page: number = 1): Promise<{ markets: Market[], total: number, totalPages: number }> {
    const perPage = 10;
    const markets = await this.marketModel
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    const total = await this.marketModel.countDocuments().exec();
    const totalPages = Math.ceil(total / perPage);

    return { markets, total, totalPages };
  }

  getUserById(id: number) {
    return this.marketModel.findById(id);
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

  async resetTotals(id: string): Promise<Market> {
    const market = await this.marketModel.findById(id);
    if (!market) {
      throw new NotFoundException(`Market with ID ${id} not found`);
    }

    market.numberMa = market.numberMaInitial;
    market.numberMi = market.numberMiInitial;

    return market.save();
  }

  async getAllMarkets(): Promise<Market[]> {
    return this.marketModel.find().exec();
  }

  async decreaseTotals(id: string, period: 'Matin' | 'Midi'): Promise<Market> {
    const market = await this.marketModel.findById(id);
    if (!market) {
      throw new NotFoundException(`Market with ID ${id} not found`);
    }

    if (period === 'Matin') {
      market.numberMa = Math.max(market.numberMa - 1, 0);
    } else if (period === 'Midi') {
      market.numberMi = Math.max(market.numberMi - 1, 0);
    }

    return market.save();
  }
}
