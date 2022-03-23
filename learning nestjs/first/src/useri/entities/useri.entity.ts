import { InfoEntity } from "src/info/entities/info.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('useri')
export class UseriEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(type => InfoEntity, info => info.user)
  @JoinColumn()
  info: InfoEntity
}