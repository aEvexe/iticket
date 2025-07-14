import { Module } from '@nestjs/common';
import { VenueTypeService } from './venue_types.service';
import { VenueTypesController } from './venue_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VenueType, VenueTypeSchema } from './schemas/venue_type.schema';

@Module({
   imports: [
    MongooseModule.forFeature([
      { name: VenueType.name, schema: VenueTypeSchema},
    ]),
  ],
  controllers: [VenueTypesController],
  providers: [VenueTypeService],
})
export class VenueTypesModule {}
