import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto, LoginDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { get } from 'mongoose';

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
  login( @Body() dto: LoginDto){
    return this.managerService.login(dto);
  }


  
}
