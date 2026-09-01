import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: { getHello: jest.Mock };

  beforeEach(async () => {
    appService = {
      getHello: jest.fn()
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService
        }
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should call AppService.getHello and return its result', () => {
      appService.getHello.mockReturnValue('Hello World!');

      const result = appController.getHello();

      expect(appService.getHello).toHaveBeenCalledTimes(1);
      expect(result).toBe('Hello World!');
    });
  });
});
