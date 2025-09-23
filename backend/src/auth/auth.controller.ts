// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import {  CreateAdminDto } from '../admin/dto/create-admin.dto'; // adjust path
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Response } from 'express';
import { Res } from '@nestjs/common';
import { log } from 'console';

class LoginDto {    
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateAdminDto) {
    // AdminService.create will hash password (as implemented earlier)
    const admin = await this.adminService.create(dto);
    console.log("admin rcord",admin);
    
    const { password, ...rest } = admin;
    const userWithToken = await this.authService.login(admin);
    const user = { ...rest, ...userWithToken };
    return user;
  }

  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() body: LoginDto){
    try {
        
    const user = await this.authService.validateUser(body.email, body.password);
    console.log("user",user);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = await this.authService.login(user);
    res.cookie('jwt', token.access_token, {
    httpOnly: true,   // prevent client-side JS access
    secure: true,     // use true in production (requires HTTPS)
    sameSite: 'strict',
  });
    return token;
    } catch (error) {
      console.error("Login error:", error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }
 

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // req.user was set by JwtStrategy.validate()
    console.log("req.user",req.user);
    
    return req.user;
  }
}
