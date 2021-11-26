import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';


export interface PostsRo {
  list: PostsEntity[]
  count: number
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>
  ) { }

  // 创建文章
  // async create(post: Partial<PostsEntity>)
}
