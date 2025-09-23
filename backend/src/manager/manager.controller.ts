import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto, LoginDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { get } from 'mongoose';
import type { Response } from 'express';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  
  
  @UseGuards(JwtAuthGuard)
    @Post('AddUserRole')
    addUserRole(@Request()req  , @Body() dto: CreateManagerDto) {
      console.log("req.user",req.user);
      return this.managerService.addUserRole(dto, req.user);
    }

  @Post("login")
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto){
    const managerdetail = await this.managerService.login(dto);
    res.cookie('jwt', managerdetail.access_token, {
    httpOnly: true,   // prevent client-side JS access
    secure: true,     // use true in production (requires HTTPS)
    sameSite: 'strict'
  });
    return managerdetail;
  }
  @UseGuards(JwtAuthGuard)
  @Get("getAll")
  findAll( @Request() req){
    return this.managerService.findAll(req.user);
  }


  
}
