import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { AdminHelperService } from './admin.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AdminHelperService],
  exports: [AdminHelperService], // 👈 make it available outside
})
export class UtilsModule {}
