import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string

  @ApiPropertyOptional({ description: '昵称' })
  readonly nickname: string

  @ApiPropertyOptional({ description: '头像' })
  readonly avatar: string

  @ApiPropertyOptional({ description: '邮箱' })
  readonly email: string
}
