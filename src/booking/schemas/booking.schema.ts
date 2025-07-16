import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaymentMethod } from '../../payment_method/schemas/payment_method.schema';
import { DeliveryMethod } from '../../delivery_method/schemas/delivery_method.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true }) // handles createdAt and updatedAt automatically
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true })
  cart_id: string;

  @Prop({ type: Date })
  finishedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' })
  payment_method_id: PaymentMethod;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryMethod' })
  delivery_method_id: DeliveryMethod;

  @Prop({ type: String, default: 'pending' }) 
  status: string;

  @Prop({ type: String })
  discount_coupon_id: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
