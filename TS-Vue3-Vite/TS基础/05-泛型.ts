export { }

/* 函数通用的表达
Function 标注了, 但跟没标注一样
(...args: any[]) => any 推荐 */



function fn(x: number | boolean): number | boolean {
  return x
}
fn(10)
fn(true)



function fn2<T>(x: T): T {
  return x
}
fn2(10)
fn2(true)



function fn3<T>(x: Array<T>): Array<T> {
  return x
}
fn3([])



function fn4<T>(x: T[]): T[] {
  return x
}
fn4([1, 2, 3])




// 2023-12-04 18:37 星期一
type FanXing<T> = {
  shu_xing: string,
  /* 方法里怎么用泛型变量?
  ()后面不能加, 那是返回值类型的位置
  <>加()前面 */
  fang_fa<K extends string & keyof T>(
    name: `${K}Changed`,
    callback: (oldVal: T[K], newVal: T[K]) => void,
  ): void
}
declare function fn5<T>(obj: T): FanXing<T>;

const personWatcher = fn5({
  firstName: 'John',
  lastName: 'Doe',
  age: 26,
  birthday: new Date()
})
personWatcher.fang_fa('birthdayChanged', (oldVal, newVal) => { })



// 2024-01-04 01:12 星期四
/* 对防抖函数进行类型标注 */
function handler(a: number, b: number) {
  return a + b
}

/* 一参类型和返回值类型, 是有关联的 */
// declare function debounce(fn: Function, duration: number): Function

/* 防抖接收的函数它有返回值类型
fn6调用时, 应该是没有返回值类型的, 所以要去掉 */
// declare function debounce<T>(fn: T, duration: number): T

declare function debounce<P extends any[], R>(
  fn: (...args: P) => R, // ...其实是剩余参数的语法, 剩余参数是一个数组
  duration: number
): (...args: P) => void

const fn6 = debounce(handler, 1000)
fn6(3, 14)