import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLikeService } from './user-like.service';
import { UserLikeEntity } from './entities/user-like.entity';
import { ArticleEntity } from '#/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLikeEntity])],
  providers: [UserLikeService],
  exports: [UserLikeService]
})
export class UserLikeModule {}
