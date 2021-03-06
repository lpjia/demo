import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostsRo, PostsService } from './posts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }


  /**
   * @param post
   */
  @ApiOperation({ summary: '批量添加测试数据' })
  @Post('test')
  async createTestData(@Body() post: CreatePostDto) {
    return await this.postsService.createTestData(post)
  }


  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post)
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query)
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({ summary: '获取指定文章' })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.postsService.findById(id)
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: CreatePostDto) {
    return await this.postsService.updateById(id, post)
  }

  /**
   * 删除文章
   * @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postsService.remove(id)
  }
}
