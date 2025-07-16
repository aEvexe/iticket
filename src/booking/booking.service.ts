import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  create(dto: CreateBookingDto) {
    return this.bookingModel.create(dto);
  }

  findAll() {
    return this.bookingModel.find().populate(['cart_id', 'payment_method_id', 'delivery_method_id']);
  }

  async findOne(id: string) {
    const booking = await this.bookingModel.findById(id).populate(['cart_id']);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: string, dto: UpdateBookingDto) {
    const updated = await this.bookingModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Booking not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.bookingModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Booking not found');
    return { message: 'Deleted successfully' };
  }
}
