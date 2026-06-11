import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseInterceptors, ClassSerializerInterceptor, UseGuards, Put, Query } from '@nestjs/common';
import { CreateKindDto } from './dto/create-kind.dto';
import { ApiTags } from '@nestjs/swagger';
import { KindService } from './kind.service';
import { AuthGuard } from '@nestjs/passport';
import { FindAllKindDto } from './dto/find-all-kind.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('分类')
@Controller('kinds')
export class KindController {
  constructor(private readonly kindService: KindService) { }

  /** 新增分类 */
  @HttpCode(200)
  @Post()
  create(@Body() kind: CreateKindDto) {
    return this.kindService.create(kind);
  }

  /** 获取全部分类 */
  @Get('all')
  findAll() {
    return this.kindService.findAll();
  }

  /** 分页查询分类列表 */
  @Get('page')
  findAllPagination(@Query() query: FindAllKindDto) {
    return this.kindService.findAllPagination(query);
  }

  /** 获取指定分类 */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.kindService.findById(+id);
  }

  /** 更新分类 */
  @Put(':id')
  update(@Param('id') id: string, @Body() kind: CreateKindDto) {
    return this.kindService.updateById(+id, kind);
  }

  /** 删除分类 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kindService.remove(+id);
  }
}
