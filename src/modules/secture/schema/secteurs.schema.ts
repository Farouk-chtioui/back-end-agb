import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Secteur extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Number], required: true })
  codesPostaux: number[];
}

export const SecteurSchema = SchemaFactory.createForClass(Secteur);