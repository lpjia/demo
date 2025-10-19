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
  // async findAll() {
  //   // const [list, total] = await this.articleRepository.findAndCount()
  //   // return { list: list ?? [], total }

  //   // // return await this.articleRepository.find()
  // }

  async findAll(): Promise<{ list: ArticleEntity[]; total: number }> {
    const [list, total] = await this.articleRepository.findAndCount();
    // 确保返回非空数组
    const result = {
      list: Array.isArray(list) ? list : [],
      total: total || 0
    };
    return result;
  }

  // 根据id查询文章
  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id },
    });
  }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} article`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} article`;
  // }
}
