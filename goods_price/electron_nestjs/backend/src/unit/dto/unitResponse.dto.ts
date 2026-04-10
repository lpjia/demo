import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UnitResponseDTO {
  @ApiProperty({ description: 'ID' })
  @Expose() // 标记 “需要被保留” 的字段
  readonly id: number;

  @ApiProperty({ description: '计价单位名字' })
  @Expose()
  readonly unitName: string;

  @ApiPropertyOptional({ description: '排序' })
  @Expose()
  readonly sortNum: string;
}
