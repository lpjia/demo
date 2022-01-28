import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Commodity {
  @PrimaryColumn()
  id: number

  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({ length: 50 })
  product_name: string

  @Column()
  unit_price: number

  @Column({ length: 10 })
  unit: string

  @Column({ length: 50 })
  shop: string

  @Column()
  discount_price: number

  @Column()
  discount_rate: number

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
