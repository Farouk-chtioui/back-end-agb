import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PlansService } from '../services/plans.service';
import { CreatePlanDto } from '../dto/plan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.plansService.findById(id);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.plansService.findByDate(date);
  }



  @Delete(':id')
  deletePlan(@Param('id') id: string) {
    return this.plansService.deletePlan(id);
  }
}