import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.registerAdmin(dto);
  }

  // Admin creates manager (guarded, we need currentUser)
  @UseGuards(JwtAuthGuard)
  @Post('create-manager')
  async createManager(@Body() dto: CreateUserDto, @Req() req) {
    return this.userService.createManager(dto, req.user); // ✅ pass current user
  }
}
