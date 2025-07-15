import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

  create(dto: CreateTicketDto) {
    return this.ticketModel.create(dto);
  }

  findAll() {
    return this.ticketModel
      .find()
      .populate('event_id')
      .populate('seat_id')
      .populate('ticket_status_id');
  }

  findOne(id: string) {
    return this.ticketModel
      .findById(id)
      .populate('event_id')
      .populate('seat_id')
      .populate('ticket_status_id');
  }

  update(id: string, dto: UpdateTicketDto) {
    return this.ticketModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.ticketModel.findByIdAndDelete(id);
  }
}
