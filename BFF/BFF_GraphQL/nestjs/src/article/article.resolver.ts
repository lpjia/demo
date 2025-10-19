import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticleEntity } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleList } from './dto/articleList.dto';

@Resolver(() => ArticleEntity)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) { }

  // // 查询所有文章
  // @Query(() => ArticleList, { name: 'articles' })
  // async findAll(): Promise<ArticleList> {
  //   const result = await this.articleService.findAll();
  //   return {
  //     list: result?.list ?? [],
  //     total: result?.total ?? 0,
  //   };
  // }

  // 查询所有文章
  @Query(() => ArticleList, { name: '', nullable: true })
  async findAll(): Promise<ArticleList> {
    return await this.articleService.findAll();
  }

  // // 创建文章
  // @Mutation(() => ArticleEntity)
  // createArticle(@Args('createArticleInput') createArticleInput: CreateArticleDto) {
  //   return this.articleService.create(createArticleInput);
  // }

  // // 根据ID查询文章
  // @Query(() => ArticleEntity, { name: 'article', nullable: true })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.articleService.findOne(id);
  // }

  /* // 更新文章
  @Mutation(() => ArticleEntity)
  updateArticle(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleDto
  ) {
    return this.articleService.update(id, updateArticleInput);
  }

  // 删除文章
  @Mutation(() => Boolean)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    this.articleService.remove(id);
    return true;
  } */
}