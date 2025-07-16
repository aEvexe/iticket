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
import { DistrictModule } from './district/district.module';
import { VenueModule } from './venue/venue.module';
import { VenueTypesModule } from './venue_types/venue_types.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { SeatModule } from './seat/seat.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerCardModule } from './customer-card/customer-card.module';
import { CustomerAuthModule } from './customer-auth/customer-auth.module';
import { EventTypeModule } from './event_type/event_type.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { BookingModule } from './booking/booking.module';


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
  HumanCategoryModule,
  DistrictModule,
  VenueModule,
  VenueTypesModule,
  VenuePhotoModule,
  SeatModule,
  CustomerAddressModule,
  CustomerModule,
  CustomerCardModule,
  CustomerAuthModule,
  EventTypeModule,
  EventModule,
  TicketModule,
  CartModule,
  CartItemModule,
  BookingModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
