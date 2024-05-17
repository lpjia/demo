export { }


// 类型范围


/* 基本类型
顶层类型"top type", 底层类型"bottom type"
TypeScript 有两个“顶层类型”（any和unknown），但是“底层类型”只有never唯一一个
any、unknown类型范围很大, unknown类型更安全(推荐用)
never类型是所有类型的子类型 */


/* 宽类型  窄类型
窄类型 extends 宽类型, 窄类型是宽类型的子类型 */


type LianHeJiBen = string | number | boolean
// A extends B, 可以翻译为 A是不是B的子类型
type PD21 = string extends LianHeJiBen ? true : false

type PD22 = unknown extends never ? true : false
type PD23 = never extends object ? true : false // never类型是所有类型的子类型
type PD24 = number extends number ? true : false // 自身是自身的子类型
type PD25 = 1 extends number ? true : false // 值类型是其基本类型的子类型
type PD26 = 'abc' extends string ? true : false // 值类型是其基本类型的子类型
// 以上 ? true : false 中的 true或false 就是值类型



/* 对于对象类型
属性(成员)越多, 圈越大

成员多  多key类型  大圈类型
成员少  少key类型  小圈类型 */

interface XiaoQuan {
  name: string,
}
interface DaQuan extends XiaoQuan {
  age: number,
}
/* 对于对象类型, 成员多, 大圈类型
A extends B, 可以翻译为 A圈是不是套住B圈 */
type PD31 = DaQuan extends XiaoQuan ? true : false



/* 结合三元运算符
extends 翻译为继承, 原理是一样的, 子继承父(子窄父宽)  */



type Animal = {
  name: string
}
type Dog = {
  name: string,
  skill: string,
}
type PD = Dog extends Animal ? number : string
// Dog圈大  Animal圈小



/* T extends LianHeJiBen, T是不是LianHeJiBen的子类型
联合类型, 分别来比较, 有一个成立就可以
Result的number类型参数, number和string比较、number和number比较、number和boolean比较, 有一个成立
Result2的number[]类型参数, number[]和string比较、number[]和number比较、number[]和boolean比较, 没有成立的
Result3的symbol | boolean | object类型参数, 该类型参数也是联合类型, 那就依次比较(共比较3*3=9次), 有成立的和没有成立的, 所以Result3得到的也是联合类型
由于FanXing<T>最多产生两种类型(是/否), 所以结果最多是两种类型来联合
Result4的string | number类型参数, 该类型参数也是联合类型, 那就依次比较(共比较2*3=6次), 有成立的 */
type FanXing<T> = T extends LianHeJiBen ? symbol : bigint
type Result = FanXing<number>
type Result2 = FanXing<number[]>
type Result3 = FanXing<symbol | boolean | object>
type Result4 = FanXing<string | number>
/* 想要完整匹配, 就是整体来比较, 加[], 组装成元组类型
Result3和Result5的类型不一样, 整体比较的只会得到一种类型 */
type FanXing2<T> = [T] extends [LianHeJiBen] ? symbol : bigint
type Result5 = FanXing2<symbol | boolean | object>




// unknown 类型可以表示任何值。有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的
// 借助 unknown 转换类型
let hd: string = ''
let zs = hd as unknown as number
// 直接类型断言会报错, string 类型的变量不会赋值给 number 类型的变量


/* unknown类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型） */
let v: unknown = 123;
// let v1: boolean = v; // 报错
let v2: unknown = 'abc';

let v11: unknown = v
let v12: any = v


// const命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型
const v21 = 123

// const命令声明的变量，如果赋值为对象，并不会推断为值类型
const v22 = {
  name: 'v22',
  value: 'v22'
}

// const断言
const arr = [3, 4] as const
// 相当于
const arr2: readonly [3, 4] = [3, 4]

// 如果你不喜欢枚举, 可以用const断言来替代
// 枚举初始化后, 值不能再被改变了, 用const断言后也不能改变
const page = {
  home: '/',
  about: '/about',
  contact: '/contact'
} as const // 方便把js对象的属性和值固定不变
// delete page.home // 报错, "delete" 运算符的操作数不能是只读属性。"delete" 运算符的操作数必须是可选的。
// page.home = '/home' // 报错, 无法为“home”赋值，因为它是只读属性。
// page.add = '' // 报错, page上不存在属性“add”。

const pageMenu = ['/aaa', '/bbb']
const page2 = {
  home: '/home',
  menu: pageMenu // 引用外部, 可以改其内容
} as const
page2.menu.push('/ccc')

const page3 = {
  home: '/home',
  menu: ['/aaa', '/bbb'] // 直接初始化则不能改其内容
} as const
// page3.menu.push('/ccc') // 报错, 类型“readonly ["/aaa", "/bbb"]”上不存在属性“push”。





// never 用在产生异常或函数体无限循环的情况下
// never 是所有类型的子类型
function fn(): never {
  throw new Error('出错了');
}
let bl: string = ''
bl = fn()

type PD2 = never extends string ? string : boolean

type LH = never | string | number







// void 无返回值
function fn2(): void { }
let bl2 = fn2()
bl2 = undefined