// import { Exclude } from "class-transformer";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export default class Goods extends Model {

  @Column({
    // 该选项可以解决驼峰到下划线的映射
    field: 'product_name'
  })
  productName!: string

  @Column({ field: 'unit_price' })
  unitPrice!: string

  @Column
  unit!: string

  @Column({ field: 'shop_name' })
  shopName!: string

  @Column
  position!: string

  @Column
  spec!: string


  // @Exclude() // 不生效, 搞不懂
  @Column({
    field: 'create_time'
  })
  createTime!: string

  @Column({
    field: 'update_time'
  })
  updateTime!: string
}