import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
  /** 标签名 */
  @IsNotEmpty({ message: (arg) => `${arg.property}字段不能为空` })
  readonly name!: string;
}