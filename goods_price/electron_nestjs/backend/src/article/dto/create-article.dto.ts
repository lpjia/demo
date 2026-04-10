import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty({ message: ({ property }) => `${property} 字段值不能为空` }) // 先校验字段的值不能为空, 提示哪个字段
  readonly author: string;

  @ApiProperty({ description: '内容' })
  @IsNotEmpty({ message: ({ property }) => `${property} 字段值不能为空` })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly coverUrl: string;

  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}