import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Driver, DriverSchema } from './schema/driver.schema';
import { DriverService } from './services/driver.service';
import { DriverController } from './driver.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
