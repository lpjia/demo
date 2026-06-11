import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTagEntity } from './entities/article-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleTagEntity])],
})
export class ArticleTagModule { }
