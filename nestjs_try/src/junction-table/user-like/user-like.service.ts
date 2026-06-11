import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserLikeEntity } from './entities/user-like.entity';
import { ArticleEntity } from '#/article/entities/article.entity';

@Injectable()
export class UserLikeService {
  constructor(
    @InjectRepository(UserLikeEntity)
    private readonly userLikeRepository: Repository<UserLikeEntity>,

    // @InjectRepository(ArticleEntity)
    // private readonly articleRepository: Repository<ArticleEntity>,

    private dataSource: DataSource,
  ) { }

  async toggle(userUlid: string, articleId: string) {
    const existUserLike = await this.userLikeRepository.findOne({
      where: { userUlid, articleId },
    });

    if (existUserLike) {
      return this.dataSource.transaction(async (manager) => {
        await manager.softRemove(UserLikeEntity, existUserLike);
        await manager.decrement(ArticleEntity, { id: Number(articleId) }, 'likeCount', 1);
        return { liked: false };
      });
    }
    else {
      return this.dataSource.transaction(async (manager) => {
        const like = manager.create(UserLikeEntity, { userUlid, articleId });
        await manager.save(like);
        await manager.increment(ArticleEntity, { id: Number(articleId) }, 'likeCount', 1);
        return { liked: true };
      });
    }
  }
}
