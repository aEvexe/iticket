import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Venue } from '../../venue/schemas/venue.schema';

export type VenuePhotoDocument = HydratedDocument<VenuePhoto>;

@Schema({ versionKey: false, timestamps: false })
export class VenuePhoto {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true })
  venue_id: Venue

  @Prop({ required: true })
  url: string;
}

export const VenuePhotoSchema = SchemaFactory.createForClass(VenuePhoto);
