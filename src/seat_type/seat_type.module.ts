import { Module } from '@nestjs/common';
import { SeatTypeService } from './seat_type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatTypeController } from './seat_type.controller';
import { SeatTypes, SeatTypesSchema } from './schemas/seat_type.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: SeatTypes.name,
      schema: SeatTypesSchema
    }
  ])],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
