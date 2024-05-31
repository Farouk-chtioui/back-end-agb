import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '../schema/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() admin: Admin) {
    return this.adminService.create(admin);
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
