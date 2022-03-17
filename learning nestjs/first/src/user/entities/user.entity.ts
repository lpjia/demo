import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Exclude } from 'class-transformer';
// import bcrypt from "bcryptjs";
import { hashSync } from 'bcryptjs'
import { InfoEntity } from "src/info/entities/info.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  username: string

  @OneToOne(type => InfoEntity, info => info.user)
  @JoinColumn()
  info: InfoEntity

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
