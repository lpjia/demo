import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('commodity')
export class CommodityEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({
    name: 'product_name',
    length: 20
  })
  productName: string

  @Column({
    name: 'unit_price',
    default: '',
    // type: 'tinyint'
  })
  unitPrice: string
  // 这里不能用number类型, 否则非必填项是传的''

  @Column({ length: 10 })
  unit: string

  @Column({
    name: 'shop_name',
    length: 50
  })
  shopName: string

  @Column({
    length: 50,
    default: '',
  })
  position: string

  @Column({
    length: 20,
    default: '',
  })
  spec: string

  @Column({
    name: 'discount_price',
    default: '',
    // type: 'tinyint'
  })
  discountPrice: string

  @Column({
    name: 'discount_rate',
    default: '',
    // type: 'tinyint'
  })
  discountRate: string

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
