import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { ArticleTagEntity } from '#/junction-table/article-tag/entities/article-tag.entity';
import { UserLikeService } from '#/junction-table/user-like/user-like.service';
import { isEmptyThree } from '#/core/util';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    private dataSource: DataSource,

    private readonly userLikeService: UserLikeService,
  ) { }

  async create(article: CreateArticleDto) {
    const { tags, ...articleData } = article
    const title = article.title;
    if (!title) {
      throw new HttpException('缺少文章标题', 400);
    }
    const doc = await this.articleRepository.findOne({
      where: { title }
    });
    if (doc) {
      throw new HttpException('文章已存在', 409);
    }
    const entity = await this.dataSource.transaction(async (manager) => {
      const articleObj = manager.create(ArticleEntity, articleData)
      const savedArticle = await manager.save(articleObj)

      await Promise.all(
        tags?.map(async (tagId) => {
          const articleTag = manager.create(ArticleTagEntity, {
            articleId: String(savedArticle.id),
            tagId
          })
          await manager.save(articleTag)
        }) ?? []
      )
      return savedArticle
    })

    return {
      _respData: entity,
      _respMsg: '添加成功'
    }
  }
  /* async create(article: CreateArticleDto) {
    const { tagId, ...articleData } = article
    const title = article.title;
    if (!title) {
      throw new HttpException('缺少文章标题', 400);
    }
    const doc = await this.articleRepository.findOne({
      where: { title }
    });
    if (doc) {
      throw new HttpException('文章已存在', 409);
    }
    const entity = await this.dataSource.transaction(async (manager) => {
      const articleObj = manager.create(ArticleEntity, articleData)
      const savedArticle = await manager.save(articleObj)
      const articleTag = manager.create(ArticleTagEntity, {
        articleId: String(savedArticle.id),
        tagId
      })
      await manager.save(articleTag)
      return savedArticle
    })

    return {
      _respData: entity,
      _respMsg: '添加成功'
    }
  } */
  /* async create(article: CreateArticleDto): Promise<ArticleEntity> {
    const { tagId, ...articleData } = article
    return this.dataSource.transaction(async (manager) => {
      const articleObj = manager.create(ArticleEntity, articleData)
      const savedArticle = await manager.save(articleObj)
      const articleTag = manager.create(ArticleTagEntity, {
        articleId: String(savedArticle.id),
        tagId
      })
      await manager.save(articleTag)
      return savedArticle
    })
  } */
  /* async create(article: Partial<ArticleEntity>): Promise<ArticleEntity> {
    const { title } = article;
    if (!title) {
      throw new HttpException('缺少文章标题', 400);
    }
    const doc = await this.articleRepository.findOne({
      where: { title }
    });
    if (doc) {
      throw new HttpException('文章已存在', 409);
    }
    // 先存再查, deleteTime字段则不会存在
    const result = await this.articleRepository.save(article);
    if (!result) {
      throw new HttpException('文章创建失败', 500);
    }
    const newDoc = await this.articleRepository.findOne({
      where: { title }
    });
    return newDoc!; // 不加非空断言, 类型匹配不上
  } */

  /** 获取全部文章 */
  async findAll() {
    const [list, total] = await this.articleRepository.findAndCount()
    return { total, list }
  }

  /** 分页查询文章列表 */
  async findAllPagination(query: FindAllArticleDto) {
    const { curPage, pageSize } = query;

    // 分页查询
    // 每页10条, 索引是0->10, 11->20
    const [list, total] = await this.articleRepository.findAndCount({
      skip: (curPage - 1) * pageSize,
      take: pageSize,
    });

    return {
      curPage,
      pageSize,
      total,
      list,
    };
  }

  /* // createQueryBuilder用法, 比较麻烦, 贴近原生sql写法
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
  } */

  async findOneById(id: number) {
    const qb = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.kind', 'kind') // 一参是属性, 二参是关联表的别名
      .leftJoinAndSelect('article.tagList', 'articleTag') // 把文章和中间表关联起来，并给中间表取了别名
      .leftJoinAndSelect('articleTag.tag', 'tag')
      .leftJoinAndSelect('article.likeList', 'articleLike')
      .where('article.id=:id')
      .setParameter('id', id)

    const result = await qb.getOne()
    return {
      result, qb
    }
  }

  async findViewById(id: number) {
    const { result, qb } = await this.findOneById(id)
    if (!result) {
      throw new HttpException(`id为${id}的文章不存在`, 404);
    }
    await this.articleRepository.update(id, {
      readCount: result.readCount + 1
    })
    return (await qb.getOne())?.toResponseObject()
  }

  async findById(id: number) {
    const { result, qb } = await this.findOneById(id)
    if (!result) {
      throw new HttpException(`id为${id}的文章不存在`, 404);
    }
    return (await qb.getOne())?.toResponseObject()
    // return await qb.getOne() // 测试返回的初始数据
  }
  /* async findById(id: number) {
    const existArticle = await this.articleRepository.findOne({
      where: { id },
      relations: ['kind', 'tagList', 'tagList.tag']
    });
    if (!existArticle) {
      throw new HttpException(`id为${id}的文章不存在`, 404);
    }

    // 不要关联字段kindInfo, kindInfo下级字段直接平铺到上一级, 不要时间字段
    // 如果没关联到数据, 原有kindId: null, kindInfo: null

    // existArticle.kindInfo?.name 如果kindInfo: null, 则表达式的值为undefined
    // orm会自动忽略值为undefined的属性, 去掉了kindName字段, 所以要加 ??: null
    existArticle['kindName'] = existArticle.kind?.name ?? null
    delete existArticle.kind

    existArticle['tags'] = existArticle.tagList?.map(item => ({
      id: item.tag?.id,
      name: item.tag?.name,
    })) ?? [];
    delete existArticle.tagList

    return existArticle
  } */


  // async updateById(id: number, article: CreateArticleDto) {
  // 还没有关联其他表呢
  // 现在关联tag表 2026-06-08 04:50
  // async updateById(id: number, article: Partial<ArticleEntity>) {
  //   // 除非字段不存在, findOne查数据库(kind_id值存的是空字符串)kindId会被typeorm进行parseInt('') -> NaN转换
  //   const existArticle = await this.articleRepository.findOne({
  //     where: { id }
  //   });
  //   if (!existArticle) {
  //     throw new HttpException(`id为${id}的文章不存在`, 404);
  //   }
  //   const doc = await this.articleRepository.findOneBy({ title: article.title });
  //   if (doc && doc.id !== id) { // 得排除自身
  //     throw new HttpException('文章已存在', 409);
  //   }
  //   const cleanArticle = Object.fromEntries(
  //     Object.entries(article).filter(([_, v]) => !isEmptyThree(v)) // 字段值为空的字段全都去掉
  //   )
  //   const updateArticle = this.articleRepository.merge(existArticle, cleanArticle);
  //   updateArticle.operateUpdateTime = new Date(); // 调接口改数据才更新operateUpdateTime
  //   try {
  //     await this.articleRepository.save(updateArticle);
  //     return { _respMsg: '更新成功' };
  //   }
  //   catch {
  //     throw new HttpException('更新失败', 400);
  //   }
  // }

  async updateById(id: number, article: Partial<ArticleEntity & { tags?: string[] }>) {
    const existArticle = await this.articleRepository.findOne({
      where: { id }
    });
    if (!existArticle) {
      throw new HttpException(`id为${id}的文章不存在`, 404);
    }
    const doc = await this.articleRepository.findOneBy({ title: article.title });
    if (doc && doc.id !== id) {
      throw new HttpException('文章已存在', 409);
    }
    const { tags, ...articleData } = article;
    const cleanArticle = Object.fromEntries(
      Object.entries(articleData).filter(([_, v]) => !isEmptyThree(v))
    )
    try {
      await this.dataSource.transaction(async (manager) => {
        const updateArticle = manager.merge(ArticleEntity, existArticle, cleanArticle);
        updateArticle.operateUpdateTime = new Date(); // 更新操作时间
        await manager.save(updateArticle);

        if (tags) {
          await manager.softDelete(ArticleTagEntity, { articleId: String(id) });
          await Promise.all(
            tags.map(async (tagId) => {
              const articleTag = manager.create(ArticleTagEntity, {
                articleId: String(id),
                tagId,
                operateUpdateTime: new Date() // 更新操作时间
              });
              await manager.save(articleTag);
            })
          );
        }
      });
      return { _respMsg: '更新成功' };
    }
    catch {
      throw new HttpException('更新失败', 400);
    }
  }

  async toggleLike(userUlid: string, articleId: string) {
    const article = await this.articleRepository.findOne({
      where: { id: Number(articleId) },
    });
    if (!article) {
      throw new NotFoundException(`id为${articleId}的文章不存在`);
    }
    return this.userLikeService.toggle(userUlid, articleId);
  }

  async remove(id: number) {
    const result = await this.articleRepository.softDelete({
      id,
      deleteTime: IsNull(), // 不会重复删除"已删除"的记录
    });
    if (!result.affected) {
      throw new NotFoundException(`id为${id}的文章不存在或已删除`);
    }
    await this.articleRepository.update(id, { // 调接口改数据才更新operateUpdateTime
      operateUpdateTime: new Date()
    });
    return { _respMsg: '删除成功' } // 只在服务层返回, 要不然还得在控制层判断啥的
  }
}
