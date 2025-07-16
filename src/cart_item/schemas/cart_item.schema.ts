import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Ticket } from '../../ticket/schemas/ticket.schema';
import { Cart } from '../../cart/schemas/cart.schema';

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket_id: Ticket;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true })
  cart_id: Cart;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

