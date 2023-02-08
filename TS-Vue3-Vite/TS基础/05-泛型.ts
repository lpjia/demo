export { }

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