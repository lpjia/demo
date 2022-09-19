import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

// model 不需要导出实例

@Table
export default class Admin extends Model {

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