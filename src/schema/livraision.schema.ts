import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from './client.schema';
import { Product } from './product.schema';
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

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market' })
    market: Market;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Driver' })
    driver: Driver;

    @Prop()
    status: boolean;
    @Prop()
    quantity: number;
    @Prop()
    Dépôt: boolean;
    @Prop()
    Montage: boolean;
    @Prop()
    Install: boolean;
}

export const LivraisonSchema = SchemaFactory.createForClass(Livraison);
