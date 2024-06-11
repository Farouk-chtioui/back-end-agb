import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Driver } from "src/schema/driver.schema";
import { DriverDto } from "src/dto/driver.dto";
import * as crypto from 'bcrypt';
@Injectable()
export class DriverService{
    constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>){}
    async createDriver(driverDto:DriverDto): Promise<Driver>{
        const hashedPassword = await crypto.hash(driverDto.password, 10);
        const newDriver = new this.driverModel({...driverDto, password: hashedPassword});
                return newDriver.save();
    }
    async findAll(page: number = 1, limit: number = 6): Promise<Driver[]> {
        const skip = (page - 1) * limit;
        return this.driverModel.find().skip(skip).limit(limit).exec();
      }
    async findOne(id: string): Promise<Driver>{
        return this.driverModel.findById(id).exec();
    }
    async update(id: string, driver: Driver): Promise<Driver> {
        const existingDriver = await this.driverModel.findOne({ email: driver.email }).exec();
      
        if (existingDriver && existingDriver.id !== id) {
          throw new Error('A driver with this email already exists');
        }
      
        return this.driverModel.findByIdAndUpdate(id, driver, {new: true}).exec();
      }
    async delete(id: string): Promise<Driver>{
        if(!id) throw new Error('Id is required');
        if(!this.driverModel.findById(id)) throw new Error('Driver not found');
        return this.driverModel.findByIdAndDelete(id);
        
    }
    async searchDriver(searchTerm: string): Promise<Driver[]>{
        const regex = new RegExp(searchTerm, 'i');
        return this.driverModel.find({
            $or: [
                { first_name: { $regex: regex } },
                { last_name: { $regex: regex } }
            ]
        }).exec();
    }
    async login(email: string, password: string): Promise<Driver>{
        const driver = await this.driverModel.findOne({ email }).exec();
        if (!driver) {
          throw new Error('Driver not found');
        }
      
        const isPasswordValid = await crypto.compare(password, driver.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
      
        return driver;
      }
}