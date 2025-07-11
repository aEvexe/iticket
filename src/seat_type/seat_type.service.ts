import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { SeatTypes } from './schemas/seat_type.schema';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';

@Injectable()
export class SeatTypeService {
  constructor(@InjectModel(SeatTypes.name) private readonly seatTypesSchema: Model<SeatTypes>){}
  create(createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypesSchema.create(createSeatTypeDto);
  }

  findAll() {
    return this.seatTypesSchema.find();
  }

  findOne(id: string) {
    return this.seatTypesSchema.findById(id)
  }

  update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
    return this.seatTypesSchema.findByIdAndUpdate(id, updateSeatTypeDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.seatTypesSchema.findByIdAndDelete(id);
  }
}
