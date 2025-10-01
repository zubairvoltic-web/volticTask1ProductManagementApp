import { Module } from '@nestjs/common';
import { ProService } from './pro.service';
import { ProController } from './pro.controller';

@Module({
  controllers: [ProController],
  providers: [ProService],
})
export class ProModule {}
