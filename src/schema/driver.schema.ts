import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Driver {
  @Prop()
  _id: number;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ 
    default: () => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      return date;
    }
  })
  created_at: Date;
}

const DriverSchema = SchemaFactory.createForClass(Driver);
DriverSchema.plugin(AutoIncrement, {inc_field: '_id'});
export { DriverSchema };