import { Column, CreatedAt, Model, Table } from "sequelize-typescript";

@Table
export default class Good extends Model {

  @Column({
    // 该选项可以解决驼峰到下划线的映射
    field: 'product_name'
  })
  productName!: string

  // @Column({
  //   field: 'create_time'
  // })
  // createTime!: string

  @CreatedAt
  createTime!: string;
}