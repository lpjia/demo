import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  /** 权限名 */
  @IsNotEmpty({ message: (arg) => `${arg.property}字段不能为空` })
  readonly name!: string;

  /** 权限字符串 */
  @IsNotEmpty({ message: (arg) => `${arg.property}字段不能为空` })
  readonly look!: string;

  /** 权限id */
  @IsNotEmpty({ message: (arg) => `${arg.property}字段不能为空` })
  readonly curId!: number;

  /** 父级权限id */
  readonly parentId?: number | null;

  /** 父级权限字符串 */
  readonly parentLook?: string;
}
