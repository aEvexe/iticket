import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EventTypeDocument = HydratedDocument<EventType>;

@Schema()
export class EventType {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'EventType', default: null })
  parent_event_type_id?: Types.ObjectId;
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);
