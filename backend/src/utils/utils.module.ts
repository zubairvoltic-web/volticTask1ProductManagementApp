import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { AdminHelperService } from './admin.helper';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AdminHelperService],
  exports: [AdminHelperService], // 👈 make it available outside
})
export class UtilsModule {}
