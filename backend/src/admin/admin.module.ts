import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';

@Module({
  controllers: [AdminController],
  exports: [AdminService],
  providers: [AdminService],
  imports: [
    // admin tell the schem name and the schema itself apply the schema on that collection
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])

  ],
})
export class AdminModule {}
