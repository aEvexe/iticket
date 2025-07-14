import { Injectable,BadRequestException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Model, isValidObjectId } from 'mongoose';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { District } from './schemas/district.schema';
import { Region } from '../region/schemas/region.schema';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
    ){}
  async create(createDistrictDto: CreateDistrictDto) {
    const {region_id} = createDistrictDto;
    if(!isValidObjectId(region_id)){
      throw new BadRequestException("Region ID not correct");
    }
    const region = await this.regionSchema.findById(region_id);
    if(!region){
      throw new BadRequestException("There is no such region");
    }

    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("region_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
