import { ApiProperty, ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsNumber, IsString, IsDecimal, IsOptional, IsDateString, MaxLength, Min } from 'class-validator';

export class CreateProductAndPriceDto {
  @ApiProperty({ description: '商品名' })
  @IsString({ message: 'productName字段值必须是字符串' })
  @MaxLength(20, { message: 'productName字段值不能超过20个字符' })
  readonly productName: string;

  @ApiProperty({ description: '单价' })
  @IsDecimal({}, { message: 'price字段值必须是有效的数字' })
  readonly price: string;

  @ApiProperty({ description: '计价单位ID' })
  @IsNumber({}, { message: 'unitId字段值必须是数字' })
  readonly unitId: number;

  @ApiProperty({ description: '店ID' })
  @IsNumber({}, { message: 'shopId字段值必须是数字' })
  readonly shopId: number;

  @ApiPropertyOptional({ description: '购买日期' })
  @IsDateString({}, { message: 'buyTime字段值必须是有效的日期字符串' })
  @IsOptional()
  readonly buyTime?: string;

  @ApiPropertyOptional({ description: '规格' })
  @IsString({ message: 'spec字段值必须是字符串' })
  @MaxLength(20, { message: 'spec字段值不能超过20个字符' })
  @IsOptional()
  readonly spec?: string;

  @ApiPropertyOptional({ description: '备注' })
  @IsString({ message: 'note字段值必须是字符串' })
  @MaxLength(100, { message: 'note字段值不能超过100个字符' })
  @IsOptional()
  readonly note?: string;

  @ApiPropertyOptional({ description: '商品别名' })
  @IsString({ message: 'productAlias字段值必须是字符串' })
  @MaxLength(20, { message: 'productAlias字段值不能超过20个字符' })
  @IsOptional()
  readonly productAlias?: string;
}
