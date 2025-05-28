export { }

/* 函数类型标注
Function 标注了, 但跟没标注一样


使用箭头函数形式, 定义了一个非常灵活的函数类型
(...args: any[]) => any
推荐


定义构造函数类型
type Constructor<T> = new (...args: any[]) => T;


定义抽象类类型
abstract new (...args: any[]) => any


抽象类是类的模板, 类(构造函数)是实例的模板 */


/* 抽象类的常见定义形式 */
abstract class Person {
  abstract name?: string
  abstract getName(): string
  abstract getAge?: (...args: any[]) => any
}




function Fn() {
  return 1
}
/* extends翻译为"限制"更好, 官方叫泛型约束 */
function useA<T extends (...args: any[]) => any>(param: T) { // (...args: any[]) => any 定义函数类型
  return param()
}
useA(Fn)



/* 想作为构造函数, 无奈这些老语法的构造函数, 一直波浪线报错
就算形参一定义this, 但是这个this的类型也不好定义, 放弃这种普通函数当构造函数用
违背单一原则, 还有一个词叫函数二义性
function GouZaoFn() {
  this.name = 'xxx'
  this.age = 10
} */



class ZiMu {
  constructor() { }
}

/* new (...args: any[]) => any 定义构造函数类型 */

// function useB<T extends new (...args: any[]) => any>(param: T) {
//   return param() // 报错, 类型“T”的值不可调用
// }

function useB<T extends new (...args: any[]) => any>(param: T) {
  return param // 报错, 类型“T”的值不可调用
}
// useB(new ZiMu()) // 报错, 实参得是构造函数
// useB(() => { }) // 报错, 实参是箭头函数, 不能用作构造函数
useB(ZiMu) // 类可以作为值用, 相当于函数



abstract class ChouXiangLei { }
class PuTongLei extends ChouXiangLei { }

/* abstract new (...args: any[]) => any 定义抽象类 */
function useC<T extends abstract new (...args: any[]) => any>(param: T) {
  return param
}
useC(PuTongLei)




function useD<T>(ctor: new (...args_fei: any[]) => T, ...args: any[]): T {
  return new ctor(...args); // 用的是形参二args, 形参一叫ctor, new已经用了ctor
}
const ins = useD(ZiMu, 'abc', 123)





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