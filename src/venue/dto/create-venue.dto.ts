export class CreateVenueDto {
  readonly name: string;
  readonly address?: string;
  readonly location?: string;
  readonly site?: string;
  readonly phone?: string;
  readonly schema?: string;
  readonly region_id?: string;
  readonly district_id?: string;
}
