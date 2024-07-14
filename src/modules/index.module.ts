// src/index.module.ts
import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { AdminModule } from './admin/admin.module';
import { DriverModule } from './driver/driver.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { SecteurModule } from './secture/secteurs.module';
import { LivraisonModule } from './livraision/livraision.module';
import { PlansModule } from './plans/plans.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './shared/guard/jwt-auth.guard';
import { RolesGuard } from './shared/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { DemandeLivraisonModule } from './demande-livraison/demande-livraison.mdoule';

@Module({
  imports: [
    MarketModule,
    AdminModule,
    DriverModule,
    ProductModule,
    ClientModule,
    SecteurModule,
    LivraisonModule,
    PlansModule,
    AuthModule,
    DemandeLivraisonModule,
  ],
  controllers: [],
  providers: [
 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class IndexModule {}
