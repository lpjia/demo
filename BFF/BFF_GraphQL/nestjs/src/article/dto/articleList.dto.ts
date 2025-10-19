import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleEntity } from '../entities/article.entity';

@ObjectType()
export class ArticleList {
  @Field(() => [ArticleEntity], { nullable: 'itemsAndList' })
  list?: ArticleEntity[];

  @Field(() => Int, { nullable: true })
  total?: number;
}