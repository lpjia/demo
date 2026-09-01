import { IsPositive, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PageQueryDto {
  /** 当前页码 */
  @ApiProperty({ example: 1 })
  @IsPositive({ message: (args) => `${args.property}字段必须为正数` })
  @IsInt({ message: (args) => `${args.property}字段必须为整数` })
  @IsNotEmpty({ message: (args) => `${args.property}字段不能为空` })
  @Transform((arg) => {
    const n = parseInt(arg.value, 10);
    return Number.isNaN(n) || n < 1 ? void 0 : n;
  })
  curPage!: number;

  /** 每页条数 */
  @ApiProperty({ example: 10 })
  @Max(100, { message: (arg) => `${arg.property}字段必须<=100` })
  @Min(1, { message: (arg) => `${arg.property}字段必须>=1` })
  @IsInt({ message: (args) => `${args.property}字段必须为整数` })
  @IsNotEmpty({ message: (args) => `${args.property}字段不能为空` })
  @Transform(({ value }) => {
    const n = parseInt(value, 10);
    return Number.isNaN(n) || n < 1 ? void 0 : n;
  })
  pageSize!: number;
}
