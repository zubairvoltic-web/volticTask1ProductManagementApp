import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { comparePasswords, hashPassword } from 'src/utils/helperfunc';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private readonly jwtService: JwtService,
  
  
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
    console.log("the current User",currentUser);
    
    const adminDetail = await this.userModel.findById(currentUser.userId)
    const hashedPassword = await hashPassword(dto.password);
    let adminId: string | null = null;

    if (dto.role === 'manager') {
      if (!currentUser || adminDetail.role !== 'admin') {
        throw new UnauthorizedException('Only admins can create managers');
      }
      console.log("in the admin if else block ", currentUser.userId);
      
      adminId = currentUser.userId; // ✅ comes from JWT payload
    }

    // save user in DB (pseudo)
    console.log("admin id", adminId);
    
    const newUser = {
      ...dto,
      password: hashedPassword,
      admin: adminId,
    };
    const createUser = new this.userModel(newUser)
    const userCreated = await createUser.save();
    
    

    return userCreated; // replace with mongoose.save() or prisma.create()
  }
  async validateUser(email: string, password: string) {
      const userInDb =await  this.userModel.findOne({ email });
        
        const isValid = await comparePasswords(password, userInDb.password);
        if (!isValid) return null;
    
        // remove sensitive data
        const { password: _, ...result } = userInDb.toObject();
        return result;
    }
  
    async login(user: any) {
      // user is the validated user (object from DB)
      const payload = { email: user.email, sub: user._id,role:user.role };
      return {
        access_token: this.jwtService.sign(payload),
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
      };
    }
    async userProfile(id:any) {
      return await this.userModel.findById(id)

    }
}
