import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketStatusDocument = HydratedDocument<TicketStatus>;

@Schema({versionKey: false, timestamps: false})
export class TicketStatus {
  @Prop()
  name: string;
}

export const TicketStatusSchema = SchemaFactory.createForClass(TicketStatus
);