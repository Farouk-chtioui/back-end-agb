import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Livraison, LivraisonSchema } from '../../livraision/schema/livraision.schema';
import { Driver } from 'src/modules/driver/schema/driver.schema';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
export class DemandeLivraison extends Livraison {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Driver', required: false })
    driver?: Driver;
    @Prop()
    price: number; 
}

export const DemandeLivraisonSchema = SchemaFactory.createForClass(DemandeLivraison);
