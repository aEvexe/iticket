import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerCard, CustomerCardDocument } from './schemas/customer-card.schema';
import { Model } from 'mongoose';
import { CreateCustomerCardDto } from './dto/create-customer-card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer-card.dto';

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private cardModel: Model<CustomerCardDocument>,
  ) {}

  create(createDto: CreateCustomerCardDto) {
    return this.cardModel.create(createDto);
  }

  findAll() {
    return this.cardModel.find().populate('customer_id');
  }

  findOne(id: string) {
    return this.cardModel.findById(id).populate('customer_id');
  }

  update(id: string, updateDto: UpdateCustomerCardDto) {
    return this.cardModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  remove(id: string) {
    return this.cardModel.findByIdAndDelete(id);
  }
}
