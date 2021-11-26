import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';


// @Controller()
// 主路径是 app
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // 以下注释中的端口号和本项目无关
  // 1. 固定路径：
  // 可以匹配到 get请求，http://localhost:9080/app/list
  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  // 可以匹配到 post请求，http://localhost:9080/app/list
  @Post('list')
  create(): string {
    return 'create'
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser(): string {
    return 'user 通配符'
  }

  // 如果因为在匹配过程中， 发现@Put("list/:id")已经满足了,就不会继续往下匹配了，
  // 所以@Put("list/user")装饰的方法应该写在它之前。
  @Put('list/user')
  updateUser() {
    return { userId: 100 }
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('list/:id')
  update(): string {
    return 'update'
  }

  @Delete('list/:id')
  delete(): string {
    return 'delete'
  }

}
