import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Param,
} from '@nestjs/common';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { SigninCustomerDto } from '../customer/dto/signin-customer.dto';
import { Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { AuthService } from './customer-auth.service';

@Controller('customer-auth')
export class CustomerAuthController {
  constructor(private readonly customerAuthService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateCustomerDto) {
    return this.customerAuthService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: SigninCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerAuthService.login(dto, res);
  }

  @HttpCode(200)
  @Post('signout')
  async signout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerAuthService.signout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  async refreshToken(
    @Param('id') id: string,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerAuthService.refreshToken(id, refreshToken, res);
  }
}
