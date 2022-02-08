import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator"

export class CreateCommodityDto {
  @ApiProperty({ description: '商品名' })
  @IsNotEmpty({ message: '商品名必填' })
  readonly productName: string

  @ApiProperty({ description: '单价' })
  @IsNotEmpty({ message: '缺少单价' })
  // @IsNumber()
  // @IsNumberString()
  readonly unitPrice: string

  @ApiProperty({ description: '计价单位' })
  @IsNotEmpty({ message: '缺少单位' })
  readonly unit: string

  @ApiProperty({ description: '商店名' })
  @IsNotEmpty({ message: '缺少商店名' })
  readonly shopName: string

  @ApiProperty({ description: '位置' })
  @IsNotEmpty({ message: '缺少位置' })
  readonly position: string

  @ApiPropertyOptional({ description: '规格' })
  readonly spec: string

  @ApiPropertyOptional({ description: '折扣价' })
  readonly discountPrice: string

  @ApiPropertyOptional({ description: '折扣' })
  readonly discountRate: string

  // @ApiProperty({ description: '文章类型' })
  // @IsNumber()
  // readonly type: number
}
