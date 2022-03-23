import { Test, TestingModule } from '@nestjs/testing';
import { UseriController } from './useri.controller';
import { UseriService } from './useri.service';

describe('UseriController', () => {
  let controller: UseriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseriController],
      providers: [UseriService],
    }).compile();

    controller = module.get<UseriController>(UseriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
