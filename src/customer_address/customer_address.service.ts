import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerAddress, CustomerAddressDocument } from './schemas/customer_address.schema';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';


@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private addressModel: Model<CustomerAddressDocument>,
  ) {}

  create(createDto: CreateCustomerAddressDto) {
    return this.addressModel.create(createDto);
  }

  findAll() {
    return this.addressModel.find().populate('customer_id region_id district_id');
  }

  findOne(id: string) {
    return this.addressModel.findById(id).populate('customer_id region_id district_id');
  }

  update(id: string, updateDto: UpdateCustomerAddressDto) {
    return this.addressModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  remove(id: string) {
    return this.addressModel.findByIdAndDelete(id);
  }
}
