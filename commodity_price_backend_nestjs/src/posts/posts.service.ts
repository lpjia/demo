import { HttpException, Injectable } from '@nestjs/common';
import { PostsEntity } from './entity/posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface IPosts { // 这个命名不对, 语义化比较弱
  list: PostsEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity) // 参数的装饰器
    private readonly postsRepository: Repository<PostsEntity>
  ) { }

  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postsRepository.findOne({
      where: { title }
    });
    if (doc) {
      throw new HttpException('文章已存在', 409);
    }
    return await this.postsRepository.save(post);
  }

  // 获取指定文章
  async findById(id: number): Promise<PostsEntity> {
    const post = await this.postsRepository.findOne({
      where: { id }
    });
    if (!post) {
      throw new HttpException('未找到指定文章', 404);
    }
    return post;
  }





  // // 获取文章列表
  // async findAll(query): Promise<PostsRo> { }

}
