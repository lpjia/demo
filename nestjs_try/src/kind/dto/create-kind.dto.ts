import { IsNotEmpty } from 'class-validator';

export class CreateKindDto {
  /** 分类名 */
  @IsNotEmpty({ message: (arg) => `${arg.property}字段不能为空` })
  readonly name!: string;
}
