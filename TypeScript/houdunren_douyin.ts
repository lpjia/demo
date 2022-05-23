// 继承
type Jia = {
  name: string
}

interface LinPeng extends Jia {
  age: number
}

const jlp: LinPeng = {
  name: 'jialinpeng',
  age: 28,
}




// 类型体操
function houdunren<T extends {
  id: number,
  render(n: number): number
}>
  (arr: T[]) {
  arr.map(a => a.render(a.id))
}

houdunren([
  {
    id: 1,
    render(n) {
      return n
    }
  },
  {
    id: 2,
    render(n) {
      return n
    }
  }
])






/**
 * 窄类型 和 宽类型
 * 这里 Zhai 属性多(限制多)范围小, 属窄类型
 * Kuan 属性少(限制少)范围大, 属宽类型
 */
type Zhai = {
  name: string,
  age: number,
}

type Kuan = {
  name: string,
}
// 窄类型继承宽类型, 判定为真值
type PanduanType = Kuan extends Zhai ? true : false
const panduanResult: PanduanType = false


/**
 * 用现实举例也是符合类继承的思想
 */
type Animal = {
  name: string
}

type Dog = {
  name: string,
  skill: string,
}

type TT = true
type FF = false

type PD = Dog extends Animal ? TT : FF
const pdResult: PD = true





/**
 * 联合类型相关的
 */
type XJ = string

type HDR = string | number

const hd: HDR extends XJ ? string : boolean = false

const xj: XJ extends HDR ? string : boolean = 'jlp'



/**
 * 泛型 类型
 */
type XJ2 = string
// 定义泛型
type HDCMS<T> = T extends XJ2 ? string : boolean

const hd2: HDCMS<number> = true

const hd3: HDCMS<string> = ''
// 数组泛型可就写着复杂了
const hd4: HDCMS<Array<boolean>> = false
/**
 * 用联合类型, 可用鼠标悬浮在 hd5 上查看
 * 联合类型, 继承判断也是"联合"分开来看
 * 最后得出一个联合类型
 */
const hd5: HDCMS<string | number> = false

type HDCMS2<T> =
  T extends XJ ? string :
  T extends HDR ? symbol : boolean

const hd6: HDCMS2<string | number> = Symbol('symbol值')


/**
 * 想要完整匹配的话, 得加 []
 */
type HDCMS3<T> = [T] extends [XJ] ? string : boolean
// 这是没有完整匹配
const hd7: HDCMS3<string | number> = true

type XJ3 = string | number

type HDCMS4<T> = [T] extends [XJ3] ? string : boolean
// 这是完整匹配的
const hd8: HDCMS4<string | number> = ''

