export { }

// 不用infer
// 传入的类型是一个数组, 则返回数组元素的类型, 否则返回该传入类型
type InferType2<T> = T extends any[] ? T[number] : T
type Result3 = InferType2<number[]>
type Result4 = InferType2<boolean>


// 推断 infer, 可以用来解包
// infer声明的类型变量只在条件类型的"真值"分支中可用
// 仅条件类型的 "extends" 子句中才允许 "infer" 声明
type InferType<T> = T extends Array<infer U> ? U : T
type Result = InferType<string[]>
type Result2 = InferType<bigint>



// 使用 infer 封装通用类型工具



/* 实现 ReturnType */
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : T

type Sum = (a: number, b: number) => number
type Concat = (a: any[], b: any[]) => any[]
let sumResult: MyReturnType<Sum>
let concatResult: MyReturnType<Concat>



/* PromiseType 获取Promise<xxx>的xxx类型 */
type PromiseType2<T> = T extends Promise<infer U> ? U : T
type PromiseType<T> = T extends Promise<infer U> ? PromiseType<U> : T

type Pt = PromiseType<Promise<Promise<Promise<string>>>>




/* FirstArg 获取函数第一个参 */
type FirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : T

type Fn = (name: string, age: number) => void
type Fa = FirstArg<Fn>




/* ArrayType 获取 */
type ArrayType<T> = T extends (infer U)[] ? U : T

type ItemType1 = ArrayType<[number, string]>
type ItemType2 = ArrayType<boolean[]>




/* 将元组转为联合类型 */
type TupleToUnion<T> = T extends (infer R)[] ? R : never
const tuple = ['a', 'b', true]
type TypeofTuple = typeof tuple
type Tp = TupleToUnion<typeof tuple>

type TupleTp = ['tianmao', 'taobao']
type Union = TupleToUnion<TupleTp>

/* 扑克牌例子 */
const colors = ['♥', '♠', '♣', '♦'] as const
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const
/* 想得到一个元组的联合类型, 不用手动傻傻的去写 */
type Colors = typeof colors[number]
type Values = typeof values[number]
function createCard(value: Values, color: Colors) { }
/* 调函数, 参数会得到正确的代码提示 */
// createCard('', '')




/* 获取对象类型中，任意层级属性的类型。 */
type PropType<T, P extends string> = string extends P ? never :
  P extends keyof T ? T[P] :
  P extends `${infer U}.${infer R}` ? (U extends keyof T ? PropType<T[U], R> : never) :
  never;

declare function getPropValue<T, P extends string>(obj: T, path: P): PropType<T, P>

const obj = {
  a: {
    b: {
      c: 666,
      d: "俺家"
    }
  }
};
type Tp2 = typeof obj
let a = getPropValue(obj, "a"); // { b: {c: number, d: string } }
let ab = getPropValue(obj, "a.b"); // {c: number, d: string }
let abd = getPropValue(obj, "a.b.d"); // string