import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostRo, PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  async create(@Body() post) {
    return await this.postService.create(post)
  }

  @Get()
  async findAll(@Query() query): Promise<PostRo> {
    return await this.postService.findAll(query)
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postService.updateById(id, post)
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postService.remove(id)
  }
}
