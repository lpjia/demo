import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { ArticleTagModule } from '#/junction-table/article-tag/article-tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), ArticleTagModule],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
