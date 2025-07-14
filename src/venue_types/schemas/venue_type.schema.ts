import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Venue } from '../../venue/schemas/venue.schema';
import { Types } from '../../types/schemas/type.schema';

export type VenueTypeDocument = HydratedDocument<VenueType>;

@Schema({ versionKey: false, timestamps: false })
export class VenueType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true })
  venue_id: Venue

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Types', required: true })
  type_id: Types
}

export const VenueTypeSchema = SchemaFactory.createForClass(VenueType);
