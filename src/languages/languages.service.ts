import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { InjectModel } from "@nestjs/mongoose";
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Languages } from './schemas/language.schema';
import { Model } from 'mongoose';

@Injectable()
export class LanguagesService {
    constructor(@InjectModel(Languages.name) private readonly languagesSchema: Model<Languages>){}
  create(createLanguageDto: CreateLanguageDto) {

    return this.languagesSchema.create(createLanguageDto);
  }

  findAll() {
    return this.languagesSchema.find();
  }

  findOne(id: string) {
    return this.languagesSchema.findById(id);
  }

  update(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.languagesSchema.findByIdAndUpdate(id, updateLanguageDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.languagesSchema.findByIdAndDelete(id);
  }
}
