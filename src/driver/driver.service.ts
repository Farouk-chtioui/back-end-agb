import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Driver } from "src/schema/driver.schema";

@Injectable()
export class DriverService{
    constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>){}
    async createDriver(driver: Driver): Promise<Driver>{
        const newDriver = new this.driverModel(driver);
        return newDriver.save();
    }
    async findAll(): Promise<Driver[]>{
        return this.driverModel.find().exec();
    }
    async findOne(id: string): Promise<Driver>{
        return this.driverModel.findById(id).exec();
    }
    async update(id: string, driver: Driver): Promise<Driver>{
        return this.driverModel.findByIdAndUpdate(id, driver, {new: true}).exec();
    }
    async delete(id: string): Promise<Driver>{
        if(!id) throw new Error('Id is required');
        if(!this.driverModel.findById(id)) throw new Error('Driver not found');
        return this.driverModel.findByIdAndDelete(id);
        
    }
    async searchDriver(name: string): Promise<Driver[]>{
        return this.driverModel.find({name: {$regex: name, $options: 'i'}}).exec();
    }
    
}