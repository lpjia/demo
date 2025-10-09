import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post)
  }

  @ApiOperation({
    summary: '获取指定文章',
    // tags: ['文章管理', '列表查询', '文章']
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.postsService.findById(id)
  }






  // @ApiOperation({ summary: '获取文章列表' })
  // @Get()
  // // async findAll(@Query() query): Promise<PostsRo> {
  // async findAll(@Query() query) {
  //   return await this.postsService.findAll(query)
  // }
}
