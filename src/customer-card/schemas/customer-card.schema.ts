import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Customer } from '../../customer/schemas/customer.schema';

export type CustomerCardDocument = HydratedDocument<CustomerCard>;

@Schema({ timestamps: true, versionKey: false })
export class CustomerCard {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer_id: Customer;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  month: number;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_main: boolean;
}

export const CustomerCardSchema = SchemaFactory.createForClass(CustomerCard);
