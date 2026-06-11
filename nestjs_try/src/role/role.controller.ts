import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseInterceptors, ClassSerializerInterceptor, UseGuards, Query, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FindAllRoleDto } from './dto/find-all-role.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('角色')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  /** 新增角色 */
  @HttpCode(200)
  @Post()
  create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }

  /** 获取全部角色 */
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }

  /** 分页查询角色列表 */
  @Get('page')
  findAllPagination(@Query() query: FindAllRoleDto) {
    return this.roleService.findAllPagination(query);
  }

  /** 获取指定角色 */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roleService.findById(+id);
  }

  /** 更新角色 */
  @Put(':id')
  update(@Param('id') id: string, @Body() role: CreateRoleDto) {
    return this.roleService.updateById(+id, role);
  }

  /** 删除角色 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
