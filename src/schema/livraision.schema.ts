import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from './client.schema';
import { Market } from './market.schema';
import { Driver } from './driver.schema';

@Schema()
export class Livraison extends Document {
    @Prop({ required: true })
    NumeroCommande: string;

    @Prop()
    Référence: string;

    @Prop()
    part_du_magasin: string;

    @Prop()
    Observations: string;

    @Prop({ required: true })
    Date: string;

    @Prop()
    Periode: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
    client: Client;

    @Prop({ type: [{ productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' }, quantity: Number, Dépôt: Boolean, Montage: Boolean, Install: Boolean }] })
    products: Array<{
        productId: MongooseSchema.Types.ObjectId;
        quantity: number;
        Dépôt: boolean;
        Montage: boolean;
        Install: boolean;
    }>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market' })
    market: Market;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Driver' })
    driver: Driver;

    @Prop()
    status: boolean;
}

export const LivraisonSchema = SchemaFactory.createForClass(Livraison);
