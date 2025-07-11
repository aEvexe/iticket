import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { Admin, AdminDocument } from "../admin/schemas/admin.schema";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}
  async generateToken(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCES_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCES_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findUserByEmail(createAdminDto.email);

    if (admin) {
      throw new ConflictException("this admin exists");
    }

    const newUser = await this.adminService.create(createAdminDto);
    return { adminId: newUser._id };
  }

  async login(loginAdminDto: SigninAdminDto, res: Response) {
    const admin = await this.adminService.findUserByEmail(loginAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      loginAdminDto.password,
      admin.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(admin);
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { adminId: admin._id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
    res.clearCookie("refreshToken");
    return { message: "Admin signed out" };
  }

  async refreshToken(id: string, refreshToken: string, res: Response) {
    const admin = await this.adminService.findOne(id);
    if (!admin || !admin.refresh_token) {
      throw new UnauthorizedException("Admin not found or no refresh token");
    }

    const isMatch = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokens = await this.generateToken(admin);
    admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { adminId: admin._id, accessToken: tokens.accessToken };
  }
}
