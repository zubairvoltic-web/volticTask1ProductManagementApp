import { Injectable } from '@nestjs/common';
import { CreateAdminDto, ReturnCreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './admin.schema';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/helperfunc';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,


    ) {}
  async create(createAdminDto: CreateAdminDto): Promise<CreateAdminDto> {
    try {
      
    console.log("createAdminDto in service:", createAdminDto);
    createAdminDto.password = await hashPassword(createAdminDto.password);
    const createdAdmin = new this.adminModel(createAdminDto);
    const newAdmin = await createdAdmin.save();
    console.log("New admin created:", newAdmin);

    return newAdmin.toObject();

    } catch (error) {
      console.error("Error creating admin:", error);
      return null;
      
      
    }
  }
  async findByEmail(email: string) {
    // Replace with your actual user fetching logic, e.g. using a model
    return await this.adminModel.findOne({ email });
  }

  // findAll() {
  //   return `This action returns all admin`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} admin`;
  // }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
}
