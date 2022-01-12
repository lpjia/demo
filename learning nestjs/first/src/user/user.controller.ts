import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [User] })
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser)
  }

  // @ApiOperation({ summary: '创建用户' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @ApiOperation({ summary: '获取用户列表' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @ApiOperation({ summary: '获取指定用户' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
