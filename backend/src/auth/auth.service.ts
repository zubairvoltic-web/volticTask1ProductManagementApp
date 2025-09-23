// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { comparePasswords } from 'src/utils/helperfunc';


@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  // used by login endpoint
  async validateUser(email: string, password: string) {
    const user = await this.adminService.findByEmail(email);
    if (!user) return null;

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) return null;

    // remove sensitive data
    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    // user is the validated user (object from DB)
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
    };
  }
  // addUserRole(dto: any) {
    // return this.adminService.addUserRole(dto);
  // }
}
