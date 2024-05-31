import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(admin: Admin): Promise<Admin> {
    const newAdmin = new this.adminModel(admin);
    return newAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, admin: Admin): Promise<Admin> {
    return this.adminModel.findByIdAndUpdate(id, admin, { new: true }).exec();
  }

   delete(id: string): Promise<Admin> {
    return this.adminModel.findByIdAndDelete(id)
  }
}
