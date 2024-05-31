import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
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
 async findAll() {
        return this.driverService.findAll();
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
}