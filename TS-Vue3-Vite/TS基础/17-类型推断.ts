export { }

// 不用infer
// 传入的类型是一个数组, 则返回数组元素的类型, 否则返回该传入类型
type InferType2<T> = T extends any[] ? T[number] : T
type Result3 = InferType2<number[]>
type Result4 = InferType2<boolean>


// 推断 infer
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
type PromiseType2<T> = T extends Promise<infer K> ? K : T
type PromiseType<T> = T extends Promise<infer K> ? PromiseType<K> : T

type Pt = PromiseType<Promise<Promise<Promise<string>>>>




/* FirstArg 获取函数第一个参 */
type FirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : T

type Fn = (name: string, age: number) => void
type Fa = FirstArg<Fn>




/* ArrayType 获取 */
type ArrayType<T> = T extends (infer I)[] ? I : T

type ItemType1 = ArrayType<[number, string]>
type ItemType2 = ArrayType<boolean[]>