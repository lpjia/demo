import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('system_config')
export class SystemConfigEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** key */
  @Column({ name: 'config_key', length: 100, unique: true })
  configKey!: string;

  /** value */
  @Column({ name: 'config_value', length: 255 })
  configValue!: string;

  /** 备注 */
  @Column({ length: 255 })
  remark!: string;
}
