import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpCode, UseGuards, Put, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FindAllTagDto } from './dto/find-all-tag.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('标签')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  /** 新增标签 */
  @HttpCode(200)
  @Post()
  create(@Body() tag: CreateTagDto) {
    return this.tagService.create(tag);
  }

  /** 获取全部标签 */
  @Get('all')
  findAll() {
    return this.tagService.findAll();
  }

  /** 分页查询标签列表 */
  @Get('page')
  findAllPagination(@Query() query: FindAllTagDto) {
    return this.tagService.findAllPagination(query);
  }

  /** 获取指定标签 */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tagService.findById(+id);
  }

  /** 更新标签 */
  @Put(':id')
  update(@Param('id') id: string, @Body() role: CreateTagDto) {
    return this.tagService.updateById(+id, role);
  }

  /** 删除标签 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
