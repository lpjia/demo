export { }

/* 参数和返回值的类型都不明确 */
function fn(x: number | boolean): number | boolean {
  return x
}
fn(10)
fn(true)


/* 通过类型参数, 使得参数和返回值的类型明确且统一 */
function fn2<T>(x: T): T {
  return x
}
fn2(10)
fn2(true)



/* 数组泛型 */
function fn3<T>(x: Array<T>): Array<T> {
  return x
}
fn3([])


/* 数组泛型, 简写 */
function fn4<T>(x: T[]): T[] {
  return x
}
fn4([1, 2, 3])