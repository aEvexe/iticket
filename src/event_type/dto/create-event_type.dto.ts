import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateEventTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  parent_event_type_id?: string;
}