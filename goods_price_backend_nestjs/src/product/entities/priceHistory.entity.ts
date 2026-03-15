import { UnitEntity } from "src/unit/entities/unit.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity("price_history")
export class PriceHistoryEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /* @Column({
    name: 'product_id',
    length: 10
  })
  productId: string; */

  @Column({
    name: 'product_id',
    type: 'int',
    unsigned: true
  })
  productId: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
  })
  price: string;

  /* @Column({
    name: 'unit_id',
    length: 10
  })
  unitId: string; */

  @Column({
    name: 'unit_id',
    type: 'int',
    unsigned: true
  })
  unitId: number;

  @Column({
    length: 20
  })
  spec: string;

  @Column({
    name: 'price_per',
    length: 20
  })
  pricePer: string;

  @Column({
    length: 100
  })
  note: string;

  @Column({
    name: 'buy_time',
    type: 'datetime',
    nullable: true,
  })
  buyTime: string | null;

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

  @ManyToOne(
    () => ProductEntity,
    product => product.priceHistoryList,
    {
      eager: false,
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(
    () => UnitEntity,
    unit => unit.priceHistoryList,
    {
      eager: false,
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn({ name: 'unit_id' })
  unitInfo: UnitEntity;
}
