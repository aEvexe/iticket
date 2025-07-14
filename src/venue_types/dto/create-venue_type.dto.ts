import { IsMongoId } from 'class-validator';

export class CreateVenueTypeDto {
  @IsMongoId()
  venue_id: string;

  @IsMongoId()
  type_id: string;
}
