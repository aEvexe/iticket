import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerAddress, CustomerAddressSchema } from './schemas/customer_address.schema';
import { CustomerAddressService } from './customer_address.service';
import { CustomerAddressController } from './customer_address.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerAddress.name, schema: CustomerAddressSchema },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
  exports: [CustomerAddressService],
})
export class CustomerAddressModule {}
