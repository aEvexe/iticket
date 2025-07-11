import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TypesModule } from './types/types.module';
import { RegionModule } from './region/region.module';
import { LanguagesModule } from './languages/languages.module';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { TicketStatusModule } from './ticket_status/ticket_status.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { HumanCategoryModule } from './human_category/human_category.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
  MongooseModule.forRoot(process.env.MONGO_URL!),
  AdminModule,
  AuthModule,
  TypesModule,
  RegionModule,
  LanguagesModule,
  SeatTypeModule,
  TicketStatusModule,
  PaymentMethodModule,
  DeliveryMethodModule,
  HumanCategoryModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
