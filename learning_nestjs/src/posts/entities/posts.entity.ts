import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列, 值自动生成

  @Column({ length: 50 })
  title: string

  // @Column({ length: 20, default: 'moren_author' })
  @Column({ length: 20 })
  author: string

  @Column('text')
  content: string

  @Column({
    name: 'thumb_url',
    default: ''
  })
  thumbUrl: string

  @Column('tinyint')
  type: number

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date
}