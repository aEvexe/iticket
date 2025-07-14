import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerCard, CustomerCardSchema } from './schemas/customer-card.schema';
import { CustomerCardService } from './customer-card.service';
import { CustomerCardController } from './customer-card.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerCard.name, schema: CustomerCardSchema },
    ]),
  ],
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
  exports: [CustomerCardService],
})
export class CustomerCardModule {}
