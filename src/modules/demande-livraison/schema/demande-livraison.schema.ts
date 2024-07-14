import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Livraison, LivraisonSchema } from '../../livraision/schema/livraision.schema';

@Schema()
export class DemandeLivraison extends Livraison {

    @Prop()
    price: number; 
}

export const DemandeLivraisonSchema = SchemaFactory.createForClass(DemandeLivraison);
