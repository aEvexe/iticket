import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LanguagesDocument = HydratedDocument<Languages>;

@Schema({versionKey: false, timestamps: false})
export class Languages {
  @Prop()
  name: string;
}

export const LanguagesSchema = SchemaFactory.createForClass(Languages);