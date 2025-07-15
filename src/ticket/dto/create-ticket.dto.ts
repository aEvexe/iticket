import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsMongoId()
  event_id: string;

  @IsMongoId()
  seat_id: string;

  @IsNumber()
  price: number;

  @IsNumber()
  service_fee: number;

  @IsMongoId()
  ticket_status_id: string;

  @IsString()
  ticket_type: string;
}
