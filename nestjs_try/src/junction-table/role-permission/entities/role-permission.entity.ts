import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { BaseEntity } from '#/common/entity/base.entity';
import { PermissionEntity } from '#/permission/entities/permission.entity';
import { RoleEntity } from '#/role/entities/role.entity';

@Entity('role_permission')
export class RolePermissionEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 角色id */
  @Column({ name: 'role_id' })
  roleId!: string;

  /** 权限id */
  @Column({ name: 'permission_id' })
  permissionId!: string;

  /** 表关联 */
  @ManyToOne(() => RoleEntity, (r) => r.roleList)
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;

  /** 表关联 */
  @ManyToOne(() => PermissionEntity, (p) => p.permissionList)
  @JoinColumn({ name: 'permission_id' })
  permission?: PermissionEntity;
}
