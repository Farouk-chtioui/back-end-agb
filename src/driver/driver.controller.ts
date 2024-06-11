import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { Driver } from "src/schema/driver.schema";
import { DriverService } from "./driver.service";

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }
    @Post()
    create(@Body() driver: Driver) {
        try {
            return this.driverService.createDriver(driver);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Driver validation failed',
            }, HttpStatus.BAD_REQUEST);
        }
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
        if (!id) throw new Error('Id is required');
        if (!this.driverService.findOne(id)) throw new Error('Driver not found');
        return this.driverService.update(id, driver);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        if (!this.driverService.findOne(id)) throw new Error('Driver not found');
        return this.driverService.delete(id);
    }
    @Get('search/:name')
    async searchDriver(@Param('name') name: string) {
        return this.driverService.searchDriver(name);
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const result = await this.driverService.login(email, password);
        if (!result) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Wrong email or password',
            }, HttpStatus.UNAUTHORIZED);
        }
        return result;
    }
}