import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './entities/posts.entity';


export interface PostsRo {
  list: PostsEntity[]
  count: number,
  pageNum: number,
  pageSize: number,
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>
  ) { }


  // 批量添加测试数据
  async createTestData(post: Partial<PostsEntity>): Promise<void> {
    const arr = []
    for (let index = 1000; index < 10010; index++) {
      let obj = {
        id: index,
        title: `title-${index}`,
        author: `author-${index}`,
        content: '',
        cover_url: '',
        type: 0,
      }
      arr.push(obj)
      await this.postsRepository.save(obj)
    }
    // return {
    //   id: 0,
    //   title: `title-0`,
    //   author: `author-0`,
    //   content: '',
    //   thumbUrl: '',
    //   type: 0,
    //   createTime: new Date(),
    //   updateTime: new Date()
    // }
    return Promise.resolve()
  }



  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post
    if (!title) throw new HttpException('缺少文章标题', 401)

    const doc = await this.postsRepository.findOne({
      where: { title }
    })
    if (doc) throw new HttpException('文章已存在', 401)

    return await this.postsRepository.save(post)
  }

  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const qb = await getRepository(PostsEntity).createQueryBuilder('post')
    qb.where('1 = 1')
    qb.orderBy('post.create_time', 'DESC')

    const count = await qb.getCount()
    const { pageNum = 1, pageSize = 100, ...params } = query
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    const posts = await qb.getMany()

    return { count, pageNum, pageSize, list: posts }
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOne(id)
  }

  // 更新文章
  async updateById(id, post): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne(id)
    if (!existPost) throw new HttpException(`id为${id}的文章不存在`, 401)

    const updatePost = this.postsRepository.merge(existPost, post)

    return this.postsRepository.save(updatePost)
  }

  // 删除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne(id)
    if (!existPost) throw new HttpException(`id为${id}的文章不存在`, 401)

    return await this.postsRepository.remove(existPost)
  }
}
