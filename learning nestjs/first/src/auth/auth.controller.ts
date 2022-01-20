import { Controller, Post, Body, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @ApiOperation({ summary: '获取 token' })
  @UseGuards(AuthGuard('local'))
  @Post('getToken')
  getToken(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }


  // @ApiOperation({ summary: '微信登录跳转' })
  // @Get('wechatLogin')
  // async wechatLogin(@Headers() header, @Res() res) {
  //   const APPID = process.env.APPID
  // }

  // async wechatLogin(@Headers()) {

  // }


  /*
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  } */
}
