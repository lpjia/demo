import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entity/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])], // 别忘了将实体导入到module
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }
