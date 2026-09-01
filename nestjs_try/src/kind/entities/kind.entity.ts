import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '#/common/entity/base.entity';
import { ArticleEntity } from '#/article/entities/article.entity';

@Entity('kind')
export class KindEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 分类名 */
  @Column({ length: 20 })
  name!: string;

  /** 文章列表 */
  @OneToMany(() => ArticleEntity, (article) => article.kind)
  articleList!: ArticleEntity[];
}
