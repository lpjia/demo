import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

// model 不需要导出实例

@Table
export default class Admin extends Model {
  // 类名在 model 是映射到表名
  // 默认表名是复数, 类名一般是单数, orm 会自动转为复数, 可配置

  // @PrimaryKey
  // @Column
  // id!: number

  @Column
  name!: string

  // @Column
  // title!: string

  // @Column
  // author!: string

  // @Column
  // content!: string

  // @Column
  // thumb_url!: string

  // @Column
  // type!: number

  // @Column
  // create_time!: string

  // @Column
  // update_time!: string
}