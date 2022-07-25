import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Body, Req, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@ApiTags('登录')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '登录后返回登录信息' })
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return req.user
  }
}