export { }


// extends
// 窄类型 和 宽类型
// 这里 Zhai 属性多(限制多)范围小, 属窄类型
// Kuan 属性少(限制少)范围大, 属宽类型
type Zhai = {
  name: string,
  age: number,
}
type Kuan = {
  name: string,
}

// extends 其实在这里被翻译成赋值, 也就是窄类型可以赋值给宽类型, 反过来不行
// 其实也可以理解为继承, 原理是一样的, 都是子继承父(子窄父宽), 窄赋值给宽
// 结合三元运算符
type Panduan = Kuan extends Zhai ? true : false // 常量类型
const panduanResult: Panduan = false // 只能赋值常量
// 窄类型赋值给宽类型, 判定为真值
type Panduan2 = Zhai extends Kuan ? true : false
const panduanResult2: Panduan2 = true

// 接口一样
interface ZhaiItf {
  name: string,
  age: number,
}
interface KuanItf {
  name: string
}
type Panduan3 = ZhaiItf extends KuanItf ? true : false

type Animal = {
  name: string
}
type Dog = {
  name: string,
  skill: string,
}
type PD = Dog extends Animal ? number : string
// Dog窄 Animal宽

// 拿联合类型举例, 联合类型不分先后
type XJ = string // 窄类型
type HDR = string | number // 宽类型
const hdr: HDR extends XJ ? string : boolean = false
const xj: XJ extends HDR ? string : boolean = 'jlp'

type LH2 = string | number | boolean
type FX<T> = T extends LH2 ? string : symbol
type Result = FX<number>
type Result2 = FX<number[]>
type Result3 = FX<Array<boolean>>
// 用联合类型, 赋值(extends)是分别赋值来比较
// symbol和LH2 boolean和LH2 object和LH2
// 由于FX<T>最多产生两种类型(是/否), 所以结果是 string | symbol
type Result4 = FX<symbol | boolean | object>
// 想要完整匹配 加[]
type FX2<T> = [T] extends [LH2] ? string : symbol
// string | number 和LH2比较, 结果就一个
type Result5 = FX2<string | number>
type Result6 = FX2<string | symbol>






// unknown 类型可以表示任何值。有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的
// 借助 unknown 转换类型
let hd: string = ''
let zs = hd as unknown as number
// 直接类型断言会报错, string 类型的变量不会赋值给 number 类型的变量







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