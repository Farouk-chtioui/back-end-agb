import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './services/admin.service';
import { Admin } from '../schema/admin.schema';
import { LoginDto } from 'src/admin/dto/login.dto';
import { AdminDto } from 'src/admin/dto/admin.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard'; // Adjust the import path as needed

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() adminDto: AdminDto): Promise<Admin> {
    return this.adminService.create(adminDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() admin: Admin) {
    return this.adminService.update(id, admin);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }

}
