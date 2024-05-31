import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../schema/admin.schema';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AdminDto } from 'src/dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(loginDto: LoginDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(loginDto.password, 10);
    const newUser = new this.adminModel({name:loginDto.name ,email: loginDto.email, password: hashedPassword });
    return newUser.save();
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
  async login(loginDto: LoginDto): Promise<Admin> {
    const user = await this.adminModel.findOne({ email: loginDto.email });
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  }
}
