import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/helperfunc';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
  
  
      ) {}
  async registerAdmin(dto:CreateUserDto){
    const hashedPassword = await hashPassword(dto.password);
    let adminId: string | null = null;
    const newUser = {
      ...dto,
      password: hashedPassword,
      admin: adminId,
    };
    const createUser = new this.userModel(newUser)
    const userCreated = await createUser.save();

    return userCreated;


  }
  async createManager(dto: CreateUserDto, currentUser:any) {
    const hashedPassword = await hashPassword(dto.password);
    let adminId: string | null = null;

    if (dto.role === 'manager') {
      if (!currentUser || currentUser.role !== 'admin') {
        throw new UnauthorizedException('Only admins can create managers');
      }
      adminId = currentUser.id; // ✅ comes from JWT payload
    }

    // save user in DB (pseudo)
    const newUser = {
      ...dto,
      password: hashedPassword,
      admin: adminId,
    };

    return newUser; // replace with mongoose.save() or prisma.create()
  }
  
}
