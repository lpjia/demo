import { Column, Entity, Index, BeforeInsert, AfterLoad, PrimaryColumn, OneToMany } from 'typeorm';
import { ulid } from 'ulid';
import { userRoleMap } from '../../core/constant';
import { BaseEntity } from '../../core/entity/base.entity';
import { UserLikeEntity } from '#/junction-table/user-like/entities/user-like.entity';
import bcrypt from "bcryptjs";
import { Exclude, Expose } from 'class-transformer';
import { UserRoleEntity } from '#/junction-table/user-role/entities/user-role.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  /** 主键ULID */
  @PrimaryColumn({ length: 26 })
  ulid!: string;

  /** 自增ID */
  @Index({ unique: true }) // 为自增列创建唯一索引
  @Column({ name: 'auto_id', generated: "increment", type: "int", unsigned: true })
  autoId!: number;

  /** 用户名 */
  @Column({ length: 50 })
  username!: string;

  /** 昵称 */
  @Column({ length: 50 })
  nickname?: string;

  /**
   * 密码
   * @privateRemarks 密码需要加密再存到数据库
   */
  @Exclude()
  @Column({ length: 255, select: false })
  password!: string;

  /** 头像 */
  @Column({ length: 255 })
  avatar?: string;

  /** 邮箱地址 */
  @Column({ length: 100 })
  email!: string;

  /**
   * 角色
   * @privateRemarks 角色(1=root, 2=author, 3=visitor)
   */
  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  role!: number;

  /**
   * 角色text
   * @privateRemarks 非数据库字段，仅用于返回给前端
   */
  @Expose()
  get roleText(): string {
    return userRoleMap[this.role] ?? '';
  }

  /** 点赞关联 */
  @OneToMany(() => UserLikeEntity, (l) => l.user)
  likeList?: UserLikeEntity[];

  constructor() {
    super()
    this.ulid = ulid();
  }

  @BeforeInsert()
  encryptPwd() {
    this.password = bcrypt.hashSync(this.password);
  }

  // /** 角色关联 */
  // @OneToMany(() => UserRoleEntity, (rp) => rp.user)
  // roleList?: UserRoleEntity[];
}
