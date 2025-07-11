import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeatTypesDocument = HydratedDocument<SeatTypes>;

@Schema({versionKey: false, timestamps: false})
export class SeatTypes {
  @Prop()
  name: string;
}

export const SeatTypesSchema = SchemaFactory.createForClass(SeatTypes);