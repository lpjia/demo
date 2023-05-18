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