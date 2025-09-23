import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from 'src/manager/manager.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductSchema } from 'src/product/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
  MongooseModule.forFeature([{ name: 'Admin', schema: ManagerSchema }]),
  MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRES_IN') },
      }),
    }),], 
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
