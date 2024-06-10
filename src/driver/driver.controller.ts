import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DriverService } from "./driver.service";
import { Driver } from "src/schema/driver.schema";

@Controller('driver')
export class DriverController {
 constructor(private readonly driverService: DriverService) {}  
 @Post()
    create(@Body() driver: Driver) {
        return this.driverService.createDriver(driver);
    }
    @Get()
    async findAll(@Query('page') page: number) {
      return this.driverService.findAll(page);
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.driverService.findOne(id);
    }   
    @Patch(':id')
    async update(@Param('id') id: string, @Body() driver: Driver) {
        return this.driverService.update(id, driver);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.driverService.delete(id);
    }
    @Get('search/:name')
    async searchDriver(@Param('name') name: string) {
        return this.driverService.searchDriver(name);
    }
}