import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/admin.schema';

@Injectable()
export class AdminHelperService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
  ) {}

  async validateAdmin(adminId: string) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('You are not authorized to perform this action');
    }
    return admin;
  }
}
