import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @Field()
  readonly title: string;

  @ApiProperty({ description: '作者' })
  @Field()
  @IsNotEmpty({ message: ({ property }) => `${property} 字段值不能为空` }) // 先校验字段的值不能为空, 提示哪个字段
  readonly author: string;

  @ApiProperty({ description: '内容' })
  @Field()
  @IsNotEmpty({ message: ({ property }) => `${property} 字段值不能为空` })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  @Field({ nullable: true })
  readonly coverUrl: string;

  @ApiProperty({ description: '文章类型' })
  @Field(() => Number)
  readonly type: number;
}