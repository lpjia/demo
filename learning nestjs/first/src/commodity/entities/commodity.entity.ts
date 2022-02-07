import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('commodity')
export class CommodityEntity {
  @PrimaryColumn()
  id: number

  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({
    name: 'product_name',
    length: 20
  })
  productName: string

  @Column({
    name: 'unit_price',
  })
  unitPrice: number

  @Column({ length: 10 })
  unit: string

  @Column({
    name: 'shop_name',
    length: 50
  })
  shopName: string

  @Column({
    name: 'discount_price',
  })
  discountPrice: number

  @Column({
    name: 'discount_rate',
  })
  discountRate: number

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
