import { Test, TestingModule } from '@nestjs/testing';
import { ProController } from './pro.controller';
import { ProService } from './pro.service';

describe('ProController', () => {
  let controller: ProController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProController],
      providers: [ProService],
    }).compile();

    controller = module.get<ProController>(ProController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
