import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  idcard: string

  @Column()
  gender: string

  @OneToOne(type => UserEntity, user => user.info)
  user: UserEntity
}
