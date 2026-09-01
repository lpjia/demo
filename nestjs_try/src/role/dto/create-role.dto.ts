import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  /** 角色名 */
  @IsNotEmpty({ message: (arg) => `${arg.property}字段不能为空` })
  readonly name!: string;
}
