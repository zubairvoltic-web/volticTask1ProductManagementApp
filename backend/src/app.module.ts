import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { ProductModule } from './product/product.module';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';
import { ProModule } from './pro/pro.module';

@Module({
  imports: [AdminModule,AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // makes env variables available everywhere
    }), MongooseModule.forRoot(process.env.DB_CONNECT), ManagerModule, ProductModule, UtilsModule, UserModule, ProModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
