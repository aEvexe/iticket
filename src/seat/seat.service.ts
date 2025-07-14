import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './schemas/seat.schema';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name)
    private readonly seatModel: Model<Seat>,
  ) {}

  create(createSeatDto: CreateSeatDto) {
    return this.seatModel.create(createSeatDto);
  }

  findAll(populate = true) {
    if (populate) {
      return this.seatModel
        .find()
        .populate('venue_id')
        .populate('seat_type_id');
    }
    return this.seatModel.find();
  }

  findOne(id: string, populate = true) {
    if (populate) {
      return this.seatModel
        .findById(id)
        .populate('venue_id')
        .populate('seat_type_id');
    }
    return this.seatModel.findById(id);
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.seatModel.findByIdAndUpdate(id, updateSeatDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.seatModel.findByIdAndDelete(id);
  }
}
