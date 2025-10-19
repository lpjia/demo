import { PriceHistoryEntity } from "src/product/entities/priceHistory.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity("unit")
export class UnitEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({
    name: 'name',
    length: 10
  })
  unitName: string;

  @Column({
    name: 'sort_num',
    length: 10
  })
  sortNum: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    nullable: true,
  })
  createTime: string;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    nullable: true,
  })
  updateTime: string;

  @DeleteDateColumn({
    name: 'delete_time',
    type: 'timestamp',
    nullable: true,
    select: false
  })
  deleteTime: Date;

  @OneToMany(
    () => PriceHistoryEntity,
    priceHistory => priceHistory.unitInfo,
    {
      eager: false,
    }
  )
  priceHistoryList: PriceHistoryEntity[];
}