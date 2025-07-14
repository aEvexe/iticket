import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VenuePhoto } from './schemas/venue_photo.schema';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';


@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto.name)
    private readonly venuePhotoModel: Model<VenuePhoto>,
  ) {}

  create(createVenuePhotoDto: CreateVenuePhotoDto) {
    return this.venuePhotoModel.create(createVenuePhotoDto);
  }

  findAll(populate = true) {
    if (populate) {
      return this.venuePhotoModel.find().populate('venue_id');
    }
    return this.venuePhotoModel.find();
  }

  findOne(id: string, populate = true) {
    if (populate) {
      return this.venuePhotoModel.findById(id).populate('venue_id');
    }
    return this.venuePhotoModel.findById(id);
  }

  update(id: string, updateDto: UpdateVenuePhotoDto) {
    return this.venuePhotoModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venuePhotoModel.findByIdAndDelete(id);
  }
}
