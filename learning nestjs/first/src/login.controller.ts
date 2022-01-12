import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Body, Req, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './login.dto';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return req.user
  }
}