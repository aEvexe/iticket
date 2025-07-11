import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HumanCategoryDocument = HydratedDocument<HumanCategory>;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Schema({versionKey: false, timestamps: false})
export class HumanCategory {
  @Prop()
  name: string;

  @Prop({required: true, unique: true})
  start_age: number;

  @Prop({unique: true})
  finish_age: number;

  @Prop()
  gender: Gender;
}

export const HumanCategorySchema = SchemaFactory.createForClass(HumanCategory);