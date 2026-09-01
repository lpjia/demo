import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Query,
  Put
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FindAllPermissionDto } from './dto/find-all-permission.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('权限')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  /** 新增权限 */
  @HttpCode(200)
  @Post()
  create(@Body() permission: CreatePermissionDto) {
    return this.permissionService.create(permission);
  }

  /** 获取全部权限 */
  @Get('all')
  findAll() {
    return this.permissionService.findAll();
  }

  /** 分页查询权限列表 */
  @Get('page')
  findAllPagination(@Query() query: FindAllPermissionDto) {
    return this.permissionService.findAllPagination(query);
  }

  /** 获取指定权限 */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.permissionService.findById(+id);
  }

  /** 更新权限 */
  @Put(':id')
  update(@Param('id') id: string, @Body() role: CreatePermissionDto) {
    return this.permissionService.updateById(+id, role);
  }

  /** 删除权限 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
