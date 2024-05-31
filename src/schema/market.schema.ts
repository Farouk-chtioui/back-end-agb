import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Market{
    
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true})
    email: string;
    
    @Prop({ required: true })
    address: string;

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
export const MarketSchema = SchemaFactory.createForClass(Market);