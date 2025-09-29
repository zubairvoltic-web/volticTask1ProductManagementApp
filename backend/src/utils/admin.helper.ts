import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/admin.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class AdminHelperService {
  constructor(
    @InjectModel(User.name) private uerModel: Model<User>,
  ) {}

  async validateAdmin(adminId: string) {
    const user = await this.uerModel.findById(adminId);
    if (user.role === 'admin') {
      return user
    }else{
      throw new NotFoundException('Manager canNot perform this action ');
    }
  }
}
