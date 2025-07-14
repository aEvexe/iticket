import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { CustomerService } from "../customer/customer.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { SigninCustomerDto } from "../customer/dto/signin-customer.dto";
import * as bcrypt from "bcrypt";
import { CustomerDocument } from "../customer/schemas/customer.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  async generateToken(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      email: customer.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_ACCESS_TOKEN_KEY,
        expiresIn: "1h",
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
        expiresIn: "7d",
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(dto: CreateCustomerDto) {
    const exists = await this.customerService.findUserByEmail(dto.email);
    if (exists) {
      throw new ConflictException("Customer already exists");
    }
    const newCustomer = await this.customerService.create(dto);
    return { customerId: newCustomer._id };
  }

  async login(dto: SigninCustomerDto, res: Response) {
    const customer = await this.customerService.findUserByEmail(dto.email);
    if (!customer) throw new UnauthorizedException("Invalid credentials");

    const isMatch = await bcrypt.compare(
      dto.password,
      customer.hashed_password
    );
    if (!isMatch) throw new UnauthorizedException("Invalid credentials");

    const { accessToken, refreshToken } = await this.generateToken(customer);
    customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await customer.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { customerId: customer._id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
    res.clearCookie("refreshToken");
    return { message: "Customer signed out" };
  }

  async refreshToken(id: string, token: string, res: Response) {
    const customer = await this.customerService.findOne(id);
    if (!customer || !customer.hashed_refresh_token)
      throw new UnauthorizedException("Customer not found");

    const isMatch = await bcrypt.compare(token, customer.hashed_refresh_token);
    if (!isMatch) throw new UnauthorizedException("Invalid refresh token");

    const { accessToken, refreshToken } = await this.generateToken(customer);
    customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await customer.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { customerId: customer._id, accessToken };
  }
}
