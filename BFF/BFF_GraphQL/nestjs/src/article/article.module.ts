import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])], // 别忘了将实体注入到module
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver]
})
export class ArticleModule { }
