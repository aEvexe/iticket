import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venue } from './schemas/venue.schema';
import { Model } from 'mongoose';

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue.name) private venueSchema: Model<Venue>){}
  create(createVenueDto: CreateVenueDto) {
    const newVenue = new this.venueSchema(createVenueDto);
    return newVenue.save();
  }

  findAll() {
    return this.venueSchema
      .find()
      .populate('region_id')     
      .populate('district_id');
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
