import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
// import bcrypt from "bcryptjs";
import { hashSync } from 'bcryptjs'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  username: string

  @Column({ length: 100, default: '' })
  nickname: string

  @Exclude()
  @Column()
  password: string

  @Column({ default: '' })
  avatar: string

  @Column({ default: '' })
  email: string

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string

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

  @BeforeInsert()
  async encryptPwd() {
    this.password = await hashSync(this.password)
  }
}
