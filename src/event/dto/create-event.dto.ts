import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  finish_date: Date;

  @IsOptional()
  @IsString()
  finish_time?: string;

  @IsOptional()
  @IsString()
  info?: string;

  @IsMongoId()
  event_type_id: string;

  @IsMongoId()
  human_category_id: string;

  @IsMongoId()
  venue_id: string;

  @IsMongoId()
  lang_id: string;

  @IsDateString()
  released_date: Date;
}
