import { Injectable, Inject } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';

import { Manager, ManagerDocument } from 'src/manager/manager.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePasswords, hashPassword } from 'src/utils/helperfunc';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async addUserRole(dto: CreateManagerDto, user: any): Promise<CreateManagerDto> {
    try {
      //   console.log("dto in service:", dto);
      console.log("user in service:", user);
      console.log("AdminId:", user.userId);
      const hashedPassword = await hashPassword(dto.password);
      dto.password = hashedPassword;

      const newManager = new this.managerModel({
        ...dto,
        adminId: user.userId, // assuming user.sub is the admin ID
      });
      console.log("New manager to be created:", newManager);
      await newManager.save();
      console.log("New manager created:", newManager)
      return dto;

    } catch (error) {
      return error;
    }


  }
  async login(dto: any): Promise<any> {
    try {
      const manager = await this.managerModel.find({ email: dto.email }).exec();
      if (!manager) {
        return { message: 'Manager not found' };
      }
      console.log("manager after", manager);
      const isPasswordValid = await comparePasswords(dto.password, manager[0].password);
      if (!isPasswordValid) {
        return { message: 'Invalid password' };
      }
      console.log("manager after password", manager);
      const payload = { email: manager[0].email, sub: manager[0]._id };
      const access_token = this.jwtService.sign(payload);
    
    
      return { access_token, expiresIn: process.env.JWT_EXPIRES_IN || '24hr' };



    } catch (error) {
      return error;
    }


  }
}