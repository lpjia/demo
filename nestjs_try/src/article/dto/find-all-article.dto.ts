import { IsPositive, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PageQueryDto } from '#/core/dto/page-query.dto';

export class FindAllArticleDto extends PageQueryDto {
  /** 随便填 */
  @IsNotEmpty({ message: (args) => `${args.property}字段不能为空` })
  name!: string
}
