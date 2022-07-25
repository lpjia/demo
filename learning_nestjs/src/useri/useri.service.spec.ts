import { Test, TestingModule } from '@nestjs/testing';
import { UseriService } from './useri.service';

describe('UseriService', () => {
  let service: UseriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseriService],
    }).compile();

    service = module.get<UseriService>(UseriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
