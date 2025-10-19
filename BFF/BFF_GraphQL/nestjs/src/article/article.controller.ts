import { Controller, Get, Post, Body, Param, ParseIntPipe, } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() article: CreateArticleDto) {
    return await this.articleService.create(article);
  }

  @ApiOperation({ summary: '查文章列表' })
  @Get('list')
  async findAll() {
    return await this.articleService.findAll();
  }

  @ApiOperation({ summary: '根据id查询文章' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articleService.remove(+id);
  // }
}
