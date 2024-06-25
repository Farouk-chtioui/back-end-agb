import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Client {
    @Prop({ required: true })
    first_name: string;
    @Prop({ required: true })
    last_name: string;
    @Prop({ required: true })
    address1: string;
    @Prop({ required: false })
    address2: string;
    @Prop({ required: true })
    phone: string;
}
const ClientSchema = SchemaFactory.createForClass(Client);
export { ClientSchema };