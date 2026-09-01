import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { BaseEntity } from '#/common/entity/base.entity';
import { UserEntity } from '#/user/entities/user.entity';
import { ArticleEntity } from '#/article/entities/article.entity';

@Entity('user_like')
export class UserLikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ name: 'user_ulid' })
  userUlid!: string;

  @Column({ name: 'article_id' })
  articleId!: string;

  @ManyToOne(() => UserEntity, (u) => u.likeList)
  @JoinColumn({ name: 'user_ulid' })
  user?: UserEntity;

  @ManyToOne(() => ArticleEntity, (a) => a.likeList)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;
}
