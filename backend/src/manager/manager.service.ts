import { Injectable, Inject, Res } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';

import { Manager, ManagerDocument } from 'src/manager/manager.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePasswords, hashPassword } from 'src/utils/helperfunc';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/admin.schema';
import type{ Response } from 'express';
import { Product } from 'src/product/product.schema';


@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,

    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Product.name) private productModel: Model<Product>,

    private readonly jwtService: JwtService,
  ) { }

  async addUserRole(dto: CreateManagerDto, user: any): Promise<CreateManagerDto> {
    try {
      //   console.log("dto in service:", dto);
    //  /check that if admin is exist in the admin model then only it can add the manager
      const admin = await this.adminModel.findById(user.userId);
      if (!admin) {
        // throw new Error('Admin not found');
        return ({ message: 'Admin not found' } as any);
      } 

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
      
    console.log("access_token",access_token);
    
    
      return { access_token, expiresIn: process.env.JWT_EXPIRES_IN || '24hr' };



    } catch (error) {
      return error;
    }


  }
  async findAll(user: any) {
    // first fetch the manager and then in the manager record get the admin id and them from admin id fetch all the product from th e product model
    const manager = await this.managerModel.find({ _id: user.userId }).exec();
    if (!manager) {
      return { message: 'Manager not found' };
    }
    console.log("manager", manager);
    const adminId = manager[0].adminId;
    // eturn list of the product from the product model
    const products = await this.productModel.find({ adminId: adminId }).exec();
    if (!products) {
      return { message: 'No products found for this admin' };
    }
    return products;
  }
    
}