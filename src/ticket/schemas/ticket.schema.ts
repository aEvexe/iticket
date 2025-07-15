import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Event } from '../../event/schemas/event.schema';
import { Seat } from '../../seat/schemas/seat.schema';
import { TicketStatus } from '../../ticket_status/schemas/ticket_status.schema';

export type TicketDocument = HydratedDocument<Ticket>;
@Schema({ timestamps: true })
export class Ticket {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event_id: Event;

  @Prop({ type: Types.ObjectId, ref: 'Seat', required: true })
  seat_id: Seat;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  service_fee: number;

  @Prop({ type: Types.ObjectId, ref: 'TicketStatus', required: true })
  ticket_status_id: TicketStatus;

  @Prop({ required: true })
  ticket_type: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

