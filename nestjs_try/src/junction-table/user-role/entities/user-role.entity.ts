import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "#/core/entity/base.entity";
import { UserEntity } from "#/user/entities/user.entity";
import { RoleEntity } from "#/role/entities/role.entity";

@Entity("user_role")
export class UserRoleEntity extends BaseEntity {
  /** 主键ID */
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  /** 用户id */
  @Column({ name: 'user_id' })
  userId!: string;

  /** 角色id */
  @Column({ name: 'role_id' })
  roleId!: string;

  // /** 表关联 */
  // @ManyToOne(() => UserEntity, (u) => u.roleList)
  // @JoinColumn({ name: 'user_id' })
  // user?: UserEntity;

  // /** 表关联 */
  // @ManyToOne(() => RoleEntity, (r) => r.userList)
  // @JoinColumn({ name: 'role_id' })
  // role?: RoleEntity;
}
