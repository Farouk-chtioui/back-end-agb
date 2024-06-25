import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Secteur extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: true })
  codesPostaux: string[];
}

export const SecteurSchema = SchemaFactory.createForClass(Secteur);