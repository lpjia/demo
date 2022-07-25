import { Test, TestingModule } from '@nestjs/testing';
import { CommodityController } from './commodity.controller';
import { CommodityService } from './commodity.service';

describe('CommodityController', () => {
  let controller: CommodityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommodityController],
      providers: [CommodityService],
    }).compile();

    controller = module.get<CommodityController>(CommodityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
