import { Column, Model, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";

@Table
export default class Student extends Model { // Student对应的表名, 不能随意命名
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column({
    field: 'student_id'
  })
  studentId!: number;

  @Column({
    field: 'class_id'
  })
  classId!: number;

  @Column
  gender!: number;

  @Column
  age!: number;
}