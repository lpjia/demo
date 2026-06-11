import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  /** 打招呼 */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
