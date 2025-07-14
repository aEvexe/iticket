import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Venue } from '../../venue/schemas/venue.schema';
import { SeatTypes } from '../../seat_type/schemas/seat_type.schema';

export type SeatDocument = HydratedDocument<Seat>;

@Schema({ versionKey: false, timestamps: false })
export class Seat {
  @Prop({ required: true })
  sector: string;

  @Prop({ required: true })
  row_number: string;

  @Prop({ required: true })
  number: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true })
  venue_id: Venue

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SeatType', required: true })
  seat_type_id: SeatTypes

  @Prop()
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
