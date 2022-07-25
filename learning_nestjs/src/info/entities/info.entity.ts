
import { UseriEntity } from "src/useri/entities/useri.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  idcard: string

  @Column({ length: 10 })
  gender: string

  @OneToOne(type => UseriEntity, useri => useri.info)
  user: UseriEntity
}
