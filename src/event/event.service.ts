import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  create(dto: CreateEventDto) {
    return this.eventModel.create(dto);
  }

  findAll() {
    return this.eventModel
      .find()
      .populate('event_type_id')
      .populate('human_category_id')
      .populate('venue_id')
      .populate('lang_id');
  }

  findOne(id: string) {
    return this.eventModel
      .findById(id)
      .populate('event_type_id')
      .populate('human_category_id')
      .populate('venue_id')
      .populate('lang_id');
  }

  update(id: string, dto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.eventModel.findByIdAndDelete(id);
  }
}
