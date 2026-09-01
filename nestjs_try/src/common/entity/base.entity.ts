import { Exclude } from 'class-transformer';
import dayjs from 'dayjs';
import {
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

export class BaseEntity {
  /** 创建时间 */
  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime'
    /* transformer: {
      to: (value: Date) => value,
      from: (value: Date) => {
        if (!value) {
          return value;
        }
        return dayjs(value).format('YYYY-MM-DD HH:mm');
      },
    }, */
  })
  createTime!: Date;

  /** 用户操作时间 */
  @Column({ name: 'operate_update_time', type: 'datetime' })
  operateUpdateTime!: Date;

  /** 更新时间 */
  @Exclude()
  @UpdateDateColumn({ name: 'update_time', type: 'datetime', select: false })
  updateTime!: Date;

  /** 删除时间 */
  @Exclude()
  @DeleteDateColumn({ name: 'delete_time', type: 'datetime', select: false })
  deleteTime!: Date;
}
