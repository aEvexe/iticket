import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { EventType } from '../../event_type/schemas/event_type.schema';
import { HumanCategory } from '../../human_category/schemas/human_category.schema';
import { Venue } from '../../venue/schemas/venue.schema';
import { Languages } from '../../languages/schemas/language.schema';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  photo: string;

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  finish_date: Date;

  @Prop()
  finish_time: string;

  @Prop()
  info: string;

  @Prop({ type: Types.ObjectId, ref: 'EventType', required: true })
  event_type_id: EventType

  @Prop({ type: Types.ObjectId, ref: 'HumanCategory', required: true })
  human_category_id: HumanCategory;

  @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
  venue_id: Venue

  @Prop({ type: Types.ObjectId, ref: 'Lang', required: true })
  lang_id: Languages;

  @Prop({ required: true })
  released_date: Date;
}

export type EventDocument = HydratedDocument<Event>;
export const EventSchema = SchemaFactory.createForClass(Event);
