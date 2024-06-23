import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan, PlanSchema } from '../schema/plans.schema';
import { Market, MarketSchema } from '../schema/market.schema';
import { Secteur, SecteurSchema } from '../schema/secteurs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: Market.name, schema: MarketSchema },
      { name: Secteur.name, schema: SecteurSchema },
    ]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}