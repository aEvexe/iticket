import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Languages, LanguagesSchema } from './schemas/language.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Languages.name,
      schema: LanguagesSchema
    }
  ])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
