import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from '../../customer/schemas/customer.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true }) 
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
  customer_id: Customer;

  @Prop()
  finishedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

