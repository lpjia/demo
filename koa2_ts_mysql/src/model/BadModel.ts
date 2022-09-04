import { Exclude } from "class-transformer";
import { Column, Table } from "sequelize-typescript";
import Good from "./GoodModel";

// @Table // 继承其他模型则不用写该装饰器
export default class Bad extends Good {

  // @Column({
  //   // 该选项可以解决驼峰到下划线的映射
  //   field: 'product_name'
  // })
  // productName!: string

  @Column({
    field: 'create_time'
  })
  createTime!: string


  // @Exclude()
  // @Column({
  //   field: 'unit_price'
  // })
  // unitPrice!: string
}