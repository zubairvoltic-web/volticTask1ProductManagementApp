import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin } from 'src/admin/admin.schema';
import { ManagerSchema } from 'src/manager/manager.schema';
import { Product, ProductSchema } from './product.schema';
import { UtilsModule } from 'src/utils/utils.module';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [UtilsModule,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
,MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}], )],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
