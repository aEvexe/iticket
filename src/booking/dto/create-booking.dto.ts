export class CreateBookingDto {
  cart_id: string;
  finishedAt?: Date;
  payment_method_id?: string;
  delivery_method_id?: string;
  status?: string;
  discount_coupon_id?: string;
}
