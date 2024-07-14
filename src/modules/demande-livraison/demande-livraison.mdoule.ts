import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemandeLivraison, DemandeLivraisonSchema } from './schema/demande-livraison.schema';
import { DemandeLivraisonService } from './services/demande-livraison.service';
import { DemandeLivraisonController } from './controller/demande-livraison.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DemandeLivraison.name, schema: DemandeLivraisonSchema }]),

  ],
  providers: [ DemandeLivraisonService],
  controllers: [ DemandeLivraisonController],
})

export class DemandeLivraisonModule {}