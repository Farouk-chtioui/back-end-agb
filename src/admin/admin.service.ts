import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from '../schema/admin.schema';
import { LoginDto } from 'src/dto/login.dto';
import { AdminDto } from 'src/dto/admin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,private readonly configService: ConfigService,
  ) {}

  async create(adminDto: AdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(adminDto.password, 10);
    const newUser = new this.adminModel({ name: adminDto.name, email: adminDto.email, password: hashedPassword });
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

  async delete(id: string): Promise<Admin> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.adminModel.findOne({ email: loginDto.email });
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const payload = { username: user.name, sub: user._id };
      const token = this.jwtService.sign(payload, {
        expiresIn: loginDto.rememberMe ? '30d' : '1h',
      });
      return { token };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
  getJwtSecret() {
    return { secret: this.configService.get<string>('JWT_SECRET') };
  }
}
