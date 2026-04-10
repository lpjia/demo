import { IsString, IsOptional, MaxLength, IsInt, Min, Validate, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum LikeFlag {
  YES = 'yes',
  NO = 'no'
}

export class ProductNameQueryDto {
  @ApiProperty({
    description: '是否为模糊查询',
    enum: LikeFlag,
    enumName: 'LikeFlag' // schema会显示其结构
  })
  @IsEnum(LikeFlag, { message: 'likeFlag字段值只能是yes或no' })
  likeFlag: LikeFlag;

  @ApiProperty({ description: '需要查的值' })
  @IsString({ message: 'fieldValue字段值必须是字符串' })
  @MaxLength(20, { message: '模糊查询关键词不能超过20个字符' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // 去空格
  fieldValue: string;
}