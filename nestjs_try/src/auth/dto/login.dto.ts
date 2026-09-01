import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  /** 用户名 */
  @IsNotEmpty({ message: '用户名必填' })
  readonly username!: string;

  /** 密码 */
  @IsNotEmpty({ message: '密码必填' })
  readonly password!: string;
}
