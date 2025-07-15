import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventType, EventTypeDocument } from './schemas/event_type.schema';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType.name)
    private readonly eventTypeModel: Model<EventTypeDocument>,
  ) {}

  async create(dto: CreateEventTypeDto): Promise<EventType> {
    const created = new this.eventTypeModel(dto);
    return created.save();
  }

  async findAll(): Promise<EventType[]> {
    return this.eventTypeModel.find().populate('parent_event_type_id').exec();
  }

 async findOne(id: string): Promise<EventType | null> {
  return this.eventTypeModel.findById(id).populate('parent_event_type_id').exec();
}

  async update(id: string, dto: UpdateEventTypeDto): Promise<EventType | null> {
    return this.eventTypeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('parent_event_type_id')
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.eventTypeModel.findByIdAndDelete(id).exec();
  }
}
