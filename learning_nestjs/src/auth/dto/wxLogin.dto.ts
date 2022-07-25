import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class WxLoginDto {
  @ApiProperty({ description: '编码' })
  @IsNotEmpty({ message: 'code 必填' })
  readonly code: string
}