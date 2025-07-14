export class CreateCustomerDto {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  birth_date?: Date;
  gender?: string;
  lang_id?: string;
}
