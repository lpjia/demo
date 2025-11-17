import { HttpException, Injectable } from '@nestjs/common';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) { }

  // 创建文章
  async create(article: Partial<ArticleEntity>): Promise<ArticleEntity> {
    const { title } = article;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.articleRepository.findOne({
      where: { title }
    });
    if (doc) {
      throw new HttpException('文章已存在', 409);
    }
    /* save方法返回的是实体对象, 我这里需要DTO */
    // const { deleteTime, ...newDoc } = result
    // return newDoc



    // 先存再查
    const result = await this.articleRepository.save(article);
    if (!result) {
      throw new HttpException('文章创建失败', 500);
    }
    const newDoc = await this.articleRepository.findOne({
      where: { title }
    });
    return newDoc!; // 不加非空断言, 类型匹配不上

  }

  // 查文章列表
  async findAll() {
    const [list, total] = await this.articleRepository.findAndCount()
    return { list, total }

    // return await this.articleRepository.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} article`;
  // }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} article`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} article`;
  // }






  /*
  // 创建文章
  async create(post: Partial<PostEntity>): Promise<PostEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postRepository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<PostRo> {
    const qb = await getRepository(PostEntity).createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定文章
  async findById(id): Promise<PostEntity> {
    return await this.postRepository.findOne(id);
  }

  // 更新文章
  async updateById(id, post): Promise<PostEntity> {
    const existPost = await this.postRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postRepository.merge(existPost, post);
    return this.postRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postRepository.remove(existPost);
  } */
}
