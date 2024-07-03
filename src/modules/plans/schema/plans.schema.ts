// plans.schema.ts
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Market } from '../../market/schema/market.schema';
import { Secteur } from '../../secture/schema/secteurs.schema';

@Schema()
export class Plan extends Document {
  @Prop({ required: true })
  Date: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market' })
  market: Market;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Secteur' }])
  secteurMatinal: (Secteur | null)[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Secteur' }])
  secteurApresMidi: (Secteur | null)[];

  @Prop()
  totalMidi: number;

  @Prop()
  totalMatin: number;

  @Prop()
  notes: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
