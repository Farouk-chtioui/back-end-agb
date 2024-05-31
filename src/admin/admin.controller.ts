import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '../schema/admin.schema';
import { LoginDto } from 'src/dto/login.dto';
import { AdminDto } from 'src/dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
async create(@Body() adminDto: AdminDto): Promise<Admin> {
  return this.adminService.create(adminDto);
}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() admin: Admin) {
    return this.adminService.update(id, admin);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
