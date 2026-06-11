import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "#/core/entity/base.entity";
import { RolePermissionEntity } from "#/junction-table/role-permission/entities/role-permission.entity";

@Entity("permission")
export class PermissionEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 权限名 */
  @Column({ length: 20 })
  name!: string;

  /** 权限id */
  @Column({ name: 'cur_id', type: 'int', unsigned: true })
  curId!: number;

  /** 权限字符串 */
  @Column({ length: 64 })
  look!: string;

  /** 父级权限id */
  @Column({ name: 'parent_id', type: 'int', unsigned: true })
  parentId!: number | null;

  /** 权限关联 */
  @OneToMany(() => RolePermissionEntity, (rp) => rp.permission)
  permissionList?: RolePermissionEntity[];
}
