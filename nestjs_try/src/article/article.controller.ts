import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpCode, UseGuards, UseInterceptors, ClassSerializerInterceptor, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '#/auth/role.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@ApiTags('文章')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  /** 新增文章 */
  // @Roles(['admin', 'author']) // 角色权限
  @UseGuards(AuthGuard('jwt'), RolesGuard) // token通过后走RolesGuard，token失效抛异常
  @HttpCode(200) // 更改默认响应状态码
  @Post()
  create(@Body() article: CreateArticleDto) {
    return this.articleService.create(article);
  }

  /** 获取全部文章 */
  // @UseGuards(AuthGuard('jwt')) // 验证策略
  @Get('all')
  findAll() {
    return this.articleService.findAll();
  }

  /** 分页查询文章列表 */
  @Get('page')
  findAllPagination(@Query() query: FindAllArticleDto) {
    return this.articleService.findAllPagination(query);
  }

  /** 获取指定文章 */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.articleService.findById(+id);
  }

  /** 获取指定文章, 阅读量+1 */
  @Get(':id/view')
  findViewById(@Param('id') id: string) {
    return this.articleService.findViewById(+id);
  }

  /** 更新文章 */
  @Put(':id')
  update(@Param('id') id: string, @Body() article: CreateArticleDto) {
    return this.articleService.updateById(+id, article);
  }

  /** 删除文章 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  /** 点赞/取消 */
  @Post(':id/like')
  toggleLike(@Param('id') id: string, @Req() req: any) {
    // req.user是JwtStrategy.validate()验证后把User实体的obj挂载上去, 不需要前端传body
    const userUlid = req.user.ulid;
    return this.articleService.toggleLike(userUlid, id);
  }
}
