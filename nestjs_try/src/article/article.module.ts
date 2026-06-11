import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { AuthModule } from '#/auth/auth.module';
import { ArticleTagModule } from '#/junction-table/article-tag/article-tag.module';
import { UserLikeModule } from '#/junction-table/user-like/user-like.module';

@Module({
  // imports 导入别的模块 // 别忘了将entity注入到module
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    AuthModule,
    ArticleTagModule,
    UserLikeModule,
  ],
  // exports:[], 导出
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule { }
