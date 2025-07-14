import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(dto: CreateCustomerDto) {
  if (!dto.password) {
    throw new Error('Password is required');
  }

  const hashed_password = await bcrypt.hash(dto.password, 7);

  const { password, ...rest } = dto;

  const created = new this.customerModel({
    ...rest,
    hashed_password,
  });

  return created.save();
}

  findUserByEmail(email: string) {
    return this.customerModel.findOne({ email });
  }

  findOne(id: string) {
    return this.customerModel.findById(id);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
  }

  async remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }

  async findAll() {
    return this.customerModel.find();
  }


}
 