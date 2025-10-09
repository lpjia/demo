import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('公共接口')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("list")
  create(): string {
    return 'createUser'
  }

  @ApiOperation({
    summary: '获取', // 概要
    description: '这是一段描述', // 详细描述
    deprecated: true // 废弃
  })
  @Get("user_:id")
  getUser() {
    return "getUser"
  }

  @Put("list/:id") // 如果请求路径已满足, 则不会继续往下匹配了
  update() {
    return "update"
  }
}
