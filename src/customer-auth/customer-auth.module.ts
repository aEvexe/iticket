import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from '../customer/customer.module';
import { AuthService } from './customer-auth.service';
import { CustomerAuthController } from './customer-auth.controller';
@Module({
  imports: [
    JwtModule.register({}),
    CustomerModule,
  ],
  controllers: [CustomerAuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class CustomerAuthModule {}
