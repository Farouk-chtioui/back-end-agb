import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketModule } from './market/market.module';
import { AdminModule } from './admin/admin.module';
import { DriverModule } from './driver/driver.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { SecteurModule } from './secture/secteurs.module';
import { Livraison } from './schema/livraision.schema';
import { LivraisonModule } from './livraision/livraision.module';
import { PlansModule } from './plans/plans.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Agb'),
    MarketModule, AdminModule, DriverModule, ProductModule, ClientModule, SecteurModule, LivraisonModule
    , PlansModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
