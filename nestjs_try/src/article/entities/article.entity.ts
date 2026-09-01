import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { articleTypeMap } from '#/common/constant';
import { KindEntity } from '#/kind/entities/kind.entity';
import { ArticleTagEntity } from '#/junction-table/article-tag/entities/article-tag.entity';
import { UserLikeEntity } from '#/junction-table/user-like/entities/user-like.entity';
import { BaseEntity } from '#/common/entity/base.entity';
import { isEmptyFour } from '#/common/util';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 文章标题 */
  @Column({ length: 50, unique: true })
  title!: string;

  /** 作者 */
  @Column({ length: 20 })
  author!: string;

  /** 文章内容 */
  @Column('text')
  content!: string;

  /** 封面URL */
  @Column({ name: 'cover_url' })
  coverUrl!: string;

  /**
   * 文章类型
   * @privateRemarks 文章类型(1=未知, 2=原创, 3=转载)
   */
  @Column({ type: 'tinyint', unsigned: true })
  type!: number;

  /**
   * 文章类型text
   * @privateRemarks 非数据库字段，仅用于返回给前端
   */
  get typeText(): string {
    return articleTypeMap[this.type] ?? '';
  }

  /** 摘要 */
  @Column()
  summary!: string;

  /** 阅读量 */
  @Column({ name: 'read_count', type: 'int', unsigned: true })
  readCount!: number;

  /** 点赞量 */
  @Column({ name: 'like_count', type: 'int', unsigned: true })
  likeCount!: number;

  /**
   * 是否推荐
   * @privateRemarks 是否推荐(1=推荐, 2=不推荐)
   */
  @Column({ name: 'is_recommend', type: 'tinyint', unsigned: true })
  isRecommend!: number;

  /**
   * 推荐text
   * @privateRemarks 非数据库字段，仅用于返回给前端
   */
  isRecommendText!: string;

  /**
   * 文章状态
   * @privateRemarks 文章状态(1=draft, 2=publish)
   */
  @Column({ type: 'tinyint', unsigned: true })
  status!: number;

  /** 分类id */
  @Column({
    name: 'kind_id',
    type: 'varchar',
    transformer: {
      to(val) {
        // 写到DB
        return val;
      },
      from(val) {
        // 从DB读
        if (isEmptyFour(val)) {
          return void 0;
        }
        return val;
      }
    }
  })
  kindId?: string;

  /** 分类关联 */
  @ManyToOne(() => KindEntity, (k) => k.articleList)
  @JoinColumn({ name: 'kind_id' })
  kind?: KindEntity;

  /** 标签关联 */
  @OneToMany(() => ArticleTagEntity, (at) => at.article)
  tagList?: ArticleTagEntity[];

  /** 点赞关联 */
  @OneToMany(() => UserLikeEntity, (l) => l.article)
  likeList?: UserLikeEntity[];

  /** 发布时间 */
  @Column({ name: 'publish_time', type: 'datetime' })
  publishTime!: Date;

  toResponseObject() {
    // 整理返回数据的格式
    const respObj = {
      ...this
      // isRecommend: this.isRecommend ? true : false,
    };
    if (this.kind) {
      respObj['kindName'] = this.kind.name;
      delete respObj.kind;
    }
    if (this.tagList) {
      respObj['tags'] = this.tagList.map((item) => ({
        id: item.tag?.id,
        name: item.tag?.name
      }));
      delete respObj.tagList;
    }
    if (this.likeList) {
      respObj['isMyLike'] = this.likeList.length > 0;
      delete respObj.likeList;
    }
    // if (this.author && this.author.id) {
    //   respObj.userId = this.author.id;
    //   respObj.author = this.author.nickname || this.author.username;
    // }
    return respObj;
  }
}
