import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductResponseDTO {
  @ApiProperty({ description: 'ID' })
  @Expose()
  readonly id: number;

  @ApiProperty({ description: '商品名字' })
  @Expose()
  readonly productName: string;

  @ApiPropertyOptional({ description: '别名' })
  @Expose()
  readonly productAlias: string;

  @ApiProperty({ description: '店ID' })
  @Expose()
  readonly shopId: number;
}
