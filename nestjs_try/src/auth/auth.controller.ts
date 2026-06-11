import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /** 登录 */
  @ApiOperation({ security: [] }) // 去掉🔒
  @UseGuards(AuthGuard('local'))
  // @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post('login')
  login(@Body() _user: LoginDto, @Req() req) {
    return this.authService.login(req.user);
  }
  // login(@Body() user: LoginDto, @Req() req) {
  //   return this.authService.login(user);
  // }
}
