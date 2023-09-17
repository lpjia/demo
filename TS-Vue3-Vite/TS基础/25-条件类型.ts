export { }

/* 条件类型, 也就是三元运算 */


/* 约束, 没用三元运算 */
type MessageOf<T extends { message: unknown }> = T["message"];
interface Email {
  message2: string;
}
// type EmailMessageContents = MessageOf<Email>
// // 缺少message字段就会报错, 不优雅


/* 条件类型约束, 用了三元运算 */
type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;
type EmailMessageContents2 = MessageOf2<Email>
// 即使缺少message字段, 也不会报错




/* 当在泛型中使用条件类型的时候，如果传入一个联合类型，就会变成 分发的 */
type ToArray<T> = T extends any ? T[] : never;
// T是联合类型时, 会遍历其中每个成员, 分别进行 extends any, 得到的也是联合类型
// 裸类型参数T, T extends any, 该参数是联合类型时, 遍历每一个联合类型的成员
type StrArrOrNumArr = ToArray<string | number>;
const strArrOrNumArr: StrArrOrNumArr = [1, 2, 3]
const strArrOrNumArr3: StrArrOrNumArr = ['1', '2', '3']
// 如果想"精确完整匹配", 加[], extends前后都要加
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;
type StrArrOrNumArr2 = ToArrayNonDistributive<string | number>;
const strArrOrNumArr2: StrArrOrNumArr2 = [1, 2, '3']
const strArrOrNumArr4: [number, number, string] = [1, 2, '3']





type NakedUsage<T> = T extends boolean ? "true" : "false"

type WrappedUsage1<T> = [T] extends [boolean] ? "true" : "false"
type WrappedUsage2<T> = { a: T } extends { a: boolean } ? "true" : "false"
type WrappedUsage3<T> = ((x: T) => void) extends ((x: boolean) => void) ? "true" : "false"
type WrappedUsage4<T> = Promise<T> extends Promise<boolean> ? "true" : "false"

type A = NakedUsage<string | true> // "false" | "true"

type A1 = WrappedUsage1<string | true> // "false"
// type A2 = WrappedUsage2<string | true> // "false"
type A2 = WrappedUsage2<true> // "true"
type A3 = WrappedUsage3<string | true> // "false"
type A4 = WrappedUsage4<string | true> // "false"