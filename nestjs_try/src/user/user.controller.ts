import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
  Query,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, RolesGuard } from '#/auth/role.guard';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 注册用户 */
  @ApiOperation({ security: [] })
  // @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }

  /** 获取登录用户信息 */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUserInfo(@Req() req) {
    return req.user;
  }

  /** 获取全部用户 */
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  /** 分页查询用户列表 */
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  findAllPagination(@Query() query: FindAllUserDto) {
    return this.userService.findAllPagination(query);
  }

  /** 获取指定用户 */
  @UseGuards(AuthGuard('jwt'))
  @Get(':ulid')
  findById(@Param('ulid') ulid: string) {
    return this.userService.findById(ulid);
  }

  /** 更新用户 */
  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':ulid')
  update(@Param('ulid') ulid: string, @Body() user: UpdateUserDto) {
    return this.userService.updateById(ulid, user);
  }

  /** 删除用户 */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':ulid')
  remove(@Param('ulid') ulid: string) {
    return this.userService.remove(ulid);
  }
}
