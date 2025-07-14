import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VenueType } from './schemas/venue_type.schema';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';


@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(VenueType.name)
    private readonly venueTypeModel: Model<VenueType>,
  ) {}

  create(createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeModel.create(createVenueTypeDto);
  }

  findAll(populate = true) {
    if (populate) {
      return this.venueTypeModel
        .find()
        .populate('venue_id')
        .populate('type_id');
    }
    return this.venueTypeModel.find();
  }

  findOne(id: string, populate = true) {
    if (populate) {
      return this.venueTypeModel
        .findById(id)
        .populate('venue_id')
        .populate('type_id');
    }
    return this.venueTypeModel.findById(id);
  }

  update(id: string, updateVenueTypeDto: UpdateVenueTypeDto) {
    return this.venueTypeModel.findByIdAndUpdate(id, updateVenueTypeDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venueTypeModel.findByIdAndDelete(id);
  }
}
