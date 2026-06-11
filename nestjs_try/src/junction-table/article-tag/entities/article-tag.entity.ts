import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "#/core/entity/base.entity";
import { ArticleEntity } from "#/article/entities/article.entity";
import { TagEntity } from "#/tag/entities/tag.entity";

@Entity("article_tag")
export class ArticleTagEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 文章id */
  @Column({ name: 'article_id', default: '' })
  articleId!: string;

  /** 标签id */
  @Column({ name: 'tag_id', default: '' })
  tagId!: string;

  /** 表关联 */
  @ManyToOne(() => ArticleEntity, (a) => a.tagList)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;

  /** 表关联 */
  @ManyToOne(() => TagEntity, (t) => t.articleList)
  @JoinColumn({ name: 'tag_id' })
  tag?: TagEntity;
}
