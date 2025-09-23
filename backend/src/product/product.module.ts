import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin } from 'src/admin/admin.schema';
import { ManagerSchema } from 'src/manager/manager.schema';
import { Product, ProductSchema } from './product.schema';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule,MongooseModule.forFeature([{ name: 'Admin', schema: ManagerSchema }])
,MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}], )],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
