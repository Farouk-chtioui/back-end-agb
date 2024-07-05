import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { Driver } from "../schema/driver.schema";
import { DriverDto } from "../dto/driver.dto";
import { DriverServiceInterface } from "../interfaces/driver.interface";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/modules/auth/services/auth.service";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { Roles } from "src/enums/roles.enum";

@Injectable()
export class DriverService implements DriverServiceInterface {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async createDriver(driverDto: DriverDto): Promise<Driver> {
    const hashedPassword = await bcrypt.hash(driverDto.password, 10);
    const newDriver = new this.driverModel({ ...driverDto, password: hashedPassword });
    return newDriver.save();
  }

  async findAll(page: number = 1, limit: number = 6): Promise<Driver[]> {
    const skip = (page - 1) * limit;
    return this.driverModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Driver> {
    return this.driverModel.findById(id).exec();
  }

  async update(id: string, driver: Driver): Promise<Driver> {
    const existingDriver = await this.driverModel.findOne({ email: driver.email }).exec();

    if (existingDriver && existingDriver.id !== id) {
      throw new Error('A driver with this email already exists');
    }

    return this.driverModel.findByIdAndUpdate(id, driver, { new: true }).exec();
  }

  async delete(id: string): Promise<Driver> {
    if (!id) throw new Error('Id is required');
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) throw new Error('Driver not found');
    return this.driverModel.findByIdAndDelete(id).exec();
  }

  async searchDriver(searchTerm: string): Promise<Driver[]> {
    const regex = new RegExp(searchTerm, 'i');
    return this.driverModel.find({
      $or: [
        { first_name: { $regex: regex } },
        { last_name: { $regex: regex } }
      ]
    }).exec();
  }

  async login(loginDto: LoginDto): Promise<{ token: string, role: string }> {
    const { token, role } = await this.authService.login(loginDto);
    console.log(`DriverService login - role: ${role}`);
    if (role !== Roles.Driver) {
      throw new UnauthorizedException('Invalid login for driver');
    }
    return { token, role };
  }
}
