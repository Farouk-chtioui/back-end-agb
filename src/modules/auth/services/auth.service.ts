import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { Admin } from '../../admin/schema/admin.schema';
import { Market } from '../../market/schema/market.schema';
import { Driver } from '../../driver/schema/driver.schema';
import { Roles } from '../../../enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Market.name) private marketModel: Model<Market>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string, role: Roles, userId: string }> {
    const { email, password } = loginDto;

    const userChecks: { model: Model<any>, role: Roles }[] = [
      { model: this.adminModel, role: Roles.Admin },
      { model: this.marketModel, role: Roles.Market },
      { model: this.driverModel, role: Roles.Driver },
    ];

    for (const { model, role } of userChecks) {
      const user = await model.findOne({ email }).exec();
      if (user) {
        console.log(`User found in model: ${model.modelName}, role: ${role}`);
        if (await bcrypt.compare(password, user.password)) {
          const payload = { username: user.name || user.first_name, sub: user._id, role };
          const token = this.jwtService.sign(payload, {
            expiresIn: loginDto.rememberMe ? '30d' : '1h',
          });
          return { token, role, userId: user._id.toString() };
        }
      }
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  createToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });
  }
}
