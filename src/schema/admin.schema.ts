import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Admin extends Document {
  @Prop({ unique: true })
  _id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Market' }] })
  markets: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }] })
  drivers: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }] })
  plans: mongoose.Schema.Types.ObjectId[];
}

const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.plugin(AutoIncrement, { inc_field: '_id' });

export { AdminSchema };
