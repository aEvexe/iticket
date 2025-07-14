import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ versionKey: false, timestamps: true })
export class Customer {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashed_password: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gender: string;

  @Prop()
  lang_id: string;

  @Prop()
  hashed_refresh_token: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
