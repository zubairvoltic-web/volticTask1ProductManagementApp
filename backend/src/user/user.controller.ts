import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.user.dto';
import type { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.registerAdmin(dto);
  }
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() body: LoginDto){
    try {
      const user = await this.userService.validateUser(body.email, body.password);
          console.log("user",user);
          if (!user) throw new UnauthorizedException('Invalid credentials');
          const token = await this.userService.login(user);
          res.cookie('jwt', token.access_token, {
          httpOnly: true,   // prevent client-side JS access
          secure: true,     // use true in production (requires HTTPS)
          sameSite: 'strict',
        });
        const userDetail =await  this.userService.userProfile(user._id)
          return userDetail;
      
    } catch (error) {
      
    }

  }
    @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,      // must match the login cookie
    sameSite: 'strict' // must match too
  });
    return { message: 'Logged out successfully' };
  }
  


  @UseGuards(JwtAuthGuard)
  @Get('profile')
    async profile(@Req() req){
    const userProfile =await  this.userService.userProfile(req.user.userId);
    return userProfile;
  }
 

  // Admin creates manager (guarded, we need currentUser)
  @UseGuards(JwtAuthGuard)
  @Post('create-manager')
  async createManager(@Body() dto: CreateUserDto, @Req() req) { 
    return this.userService.createManager(dto, req.user); // ✅ pass current user
  }
}
