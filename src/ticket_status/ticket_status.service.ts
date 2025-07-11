import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreateTicketStatusDto } from './dto/create-ticket_status.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket_status.dto';
import { TicketStatus } from './schemas/ticket_status.schema';
import { Model } from 'mongoose';

@Injectable()
export class TicketStatusService {
  constructor(@InjectModel(TicketStatus.name) private readonly typesSchema: Model<TicketStatus>){}
  create(createTicketStatusDto: CreateTicketStatusDto) {
    return this.typesSchema.create(createTicketStatusDto);
  }

  findAll() {
    return this.typesSchema.find();
  }

  findOne(id: string) {
    return this.typesSchema.findById(id)
  }

  update(id: string, updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.typesSchema.findByIdAndUpdate(id, updateTicketStatusDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.typesSchema.findByIdAndDelete(id);
  }
}
