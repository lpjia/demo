import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#/common/entity/base.entity';
import { ArticleTagEntity } from '#/junction-table/article-tag/entities/article-tag.entity';

@Entity('tag')
export class TagEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 标签名 */
  @Column({ length: 20 })
  name!: string;

  /** 表关联 */
  @OneToMany(() => ArticleTagEntity, (at) => at.tag)
  articleList?: ArticleTagEntity[];
}
