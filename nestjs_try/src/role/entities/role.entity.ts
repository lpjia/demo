import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "#/core/entity/base.entity";
import { RolePermissionEntity } from "#/junction-table/role-permission/entities/role-permission.entity";
import { UserRoleEntity } from "#/junction-table/user-role/entities/user-role.entity";

@Entity("role")
export class RoleEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 角色名 */
  @Column({ length: 20 })
  name!: string;

  /** 权限关联 */
  @OneToMany(() => RolePermissionEntity, (rp) => rp.role)
  roleList?: RolePermissionEntity[];

  // /** 权限关联 */
  // @OneToMany(() => UserRoleEntity, (ur) => ur.role)
  // userList?: UserRoleEntity[];
}
