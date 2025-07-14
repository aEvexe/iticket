import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Region } from '../../region/schemas/region.schema';
import { District } from '../../district/schemas/district.schema';

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema({ timestamps: true, versionKey: false })
export class CustomerAddress {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer_id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Region', required: true })
  region_id: Region

  @Prop({ type: Types.ObjectId, ref: 'District', required: true })
  district_id: District;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: string;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;
}

export const CustomerAddressSchema = SchemaFactory.createForClass(CustomerAddress);
