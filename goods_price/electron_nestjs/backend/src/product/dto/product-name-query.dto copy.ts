import { IsString, IsOptional, MaxLength, IsInt, Min, Validate, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductNameQueryDto {
  // 模糊查询参数：可选，但和exact不能同时为空
  @IsOptional() // 标记为可选参数
  @IsString({ message: 'like字段值必须是字符串' })
  @MaxLength(20, { message: '模糊查询关键词不能超过20个字符' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // 去空格
  @ValidateIf(o => !o.exact) // 如果没有exact，则like必须存在
  like?: string;

  // 精确查询参数：可选，但和like不能同时为空
  @IsOptional()
  @IsString({ message: 'exact字段值必须是字符串' })
  @MaxLength(20, { message: '精确查询关键词不能超过20个字符' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @ValidateIf(o => !o.like) // 如果没有like，则exact必须存在
  exact?: string;

  /* // 分页参数：页码（可选，默认1）
  @IsOptional()
  @IsInt({ message: 'page字段值必须是整数' })
  @Min(1, { message: 'page字段值不能小于1' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1)) // 转换为数字，默认1
  page?: number = 1;

  // 分页参数：每页条数（可选，默认10）
  @IsOptional()
  @IsInt({ message: 'size字段值必须是整数' })
  @Min(1, { message: 'size字段值不能小于1' })
  @MaxLength(100, { message: 'size字段不能超过100' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 10)) // 转换为数字，默认10
  size?: number = 10; */
}