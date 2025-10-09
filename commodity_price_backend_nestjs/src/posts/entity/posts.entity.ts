import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class PostsEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column("text")
  content: string;

  @Column({
    name: 'cover_url', // 对应数据库的字段用下划线命名
    default: ''
  })
  coverUrl: string; // 后台的字段常用小驼峰命名

  @Column({
    type: 'tinyint',
    unsigned: true, // 无符号, 不要负数范围, 扩大数字类型的实际使用范围
    comment: "文章类型(0=未知, 1=原创, 2=转载)" // 注释。 一般先在数据库里定义好, 实体就不用写了
  })
  type: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP", // 插入时自动填充当前时间。 这里只能是函数
    update: false, // 禁止后续更新（防止误修改创建时间）
  })
  createTime: Date;

  @Column({
    name: "update_time", // 对应数据库的列名
    type: "timestamp", // 数据库的数据类型
    default: null, // 默认值
    onUpdate: "CURRENT_TIMESTAMP", // 仅当数据更新时，自动填充当前时间。 这里只能是字符串
    nullable: true, // 可否为null
  })
  updateTime: Date | null;

  @Column({
    name: 'delete_time',
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deleteTime: Date | null;

  /* @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date */
  /* @Column({
    type: 'timestamp', 
    default: () => "CURRENT_TIMESTAMP" 
  })
  update_time: Date; */
  /* @PrimaryGeneratedColumn()
  id: number; */
  /* @Column('tinyint')
  type: number; */
}