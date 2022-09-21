import { Column, Model, PrimaryKey, Table, Comment, Default, AutoIncrement } from "sequelize-typescript";

// model 不需要导出实例
@Table
export default class Admin extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Comment('这个装饰器是干啥了')
  @Column // 如果有, 得在最下面
  name!: string

  @Default(1) // 没测
  @Column
  level!: number

  @Column
  gender!: number

  @Column({ field: 'create_time' })
  createTime!: Date

  @Column({ field: 'update_time' })
  updateTime!: Date
}