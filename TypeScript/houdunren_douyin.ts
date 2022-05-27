{
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

  // 窄类型赋值给宽类型, 判定为真值
  type PanduanType = Kuan extends Zhai ? true : false
  const panduanResult: PanduanType = false


  /**
   * extends 其实在这里被翻译成赋值, 也就是窄类型可以赋值给宽类型, 反过来不行
   * 其实也可以理解为继承, 原理是一样的, 都是子继承父(子窄父宽), 窄赋值给宽
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





  // void 默认无返回值, js 中无返回值的函数返回的也就是 undefined
  function fn(): void { }
  let bl = fn()
  bl = undefined





  /**
   * never 用在产生异常或函数体无限循环的情况下
   * never 是所有类型的子类型
   */
  function fn2(): never {
    throw new Error('出错了');
  }
  let bl2: string = ''
  bl2 = fn2()

  type PD2 = never extends string ? string : boolean

  type LH = never | string | number




  // 手写 Exclude
  type FX<T, U> = T extends U ? never : T

  type LX = string

  type LH2 = string | number

  const bl3: FX<LH2, LX> = 0
  // 联合类型, 拆开来判断, 先得出 never | number,  再得出 number

  // 有关键字 Exclude, 意思是排除
  const bl4: Exclude<LH2, LX> = 1
  // 从 LH2 中排除掉 LX 中有的, 剩下来的是 number
  // 多个类型也适用

  const bl20: Exclude<string | number | boolean, symbol | boolean> = 2






  // 手写 Extract
  type FX2<T, U> = T extends U ? T : never

  type LH3 = string | number | boolean

  type LH4 = string | object

  const bl5: FX2<LH3, LH4> = ''
  // 先是 string | never | never | never | never | never, 再得出 string

  // 有关键字 Extract, 意思是提取
  const bl6: Extract<LH3, LH4> = ''
  // 从 LH3 中提取 LH4 中有的, 剩下来的是 string






  /**
   * TypeScript中的keyof操作符，是将一个类型映射为它所有成员名称的联合类型
   */
  type LH5 = keyof User
  // 'name' | 'age'| 'open' | 'lessons'

  type LH7 = keyof any
  // 鼠标悬浮查看类型, 会发现惊喜
  // string | number | symbol

  // 参1无法确定是 obj 是一个 object
  // 参2无法保证准确提示 obj 的 key 给编码者, 无法约束 key
  // 无法确定返回值的类型
  function getVal2(obj, k) {
    return obj[k]
  }

  // 解决了上述三个问题
  function getVal<T extends object, K extends keyof T>(obj: T, k: K): T[K] {
    return obj[k]
  }
  // Object 和 object 在这的区别:
  // object 是TypeScript v2.2引入的一种非基本类型，不能被赋予原始值(比如字符串 数值 布尔值)
  // Object 是对TypeScript对JavaScript Object.prototype原型对象的定义，是所属对象类型的顶层类型，即所有对象类型都继承了Object中定义的属性/方法。
  // 同时，由于JavaScript的拆箱装箱机制，Object类型的变量可以被赋予原始值，而基本类型也可以访问Object中定义的属性/方法。
  // {} 是一个没有任何成员的对象类型，它可以访问Object中定义的属性/方法，也可以被赋予原始值。
  // 在约束对象类型时，我们应该始终使用object！
  // TypeScript的原始类型（number、string、bigint、boolean、symbol、null、undefined、object）, 在开发中，我们应当始终使用这些原始类型

  const bl15 = {
    name: '张三',
    age: 18
  }

  const bl15Result = getVal(bl15, 'age')

  // typeof, 返回值的类型, 对于 obj 会详细地把属性的类型都返回
  let bl16 = ''

  type LX6 = typeof bl16

  type LX7 = typeof bl15

  // 这是 DY 教的一种确保, 不过没有约束 key, 不够完美
  function getVal3(obj: object, k: string) {
    return obj[k as keyof typeof obj]
  }






  /**
   * in 用于取联合类型的值, 不能用于 interface
   */
  type LX2 = {
    [key in LH5]: string
  }
  // 鼠标悬浮查看会发现把联合类型遍历了





  // 手写 Pick
  type FX3<T, U extends keyof T> = {
    [P in U]: T[P]
  }

  const bl8: FX3<User, 'name' | 'age'> = {
    name: '',
    age: 0
  }

  // 有关键字 Pick, 意思是选出
  type LX3 = Pick<User, 'open'>
  // 从 User 中选出 'open'属性, 组成新的类型

  const bl9: LX3 = { open: false }
  // 也可写到一起
  // const bl9: Pick<User, 'open'> = { open: false }






  // 手写 Partial
  type FX4<T> = {
    [P in keyof T]?: T[P]
  }

  type LX5 = FX4<User>

  // 有关键字 Partial, 意思是部分的
  type LX4 = Partial<User>
  // 把 User 属性都变为可选属性

  const bl10: LX4 = { age: 0 }
  // 也可写到一起
  // const bl10: Partial<User> = { age: 0 }






  type LH6 = string | number | symbol

  // 手写 Record
  type FX5<K extends LH6, V> = {
    [P in K]: V
  }
  // 联合类型 LH6, 其实 Record 在 TS 中是默认这三种类型

  const bl14: FX5<symbol, number> = {
    [Symbol(1)]: 1
  }

  // 有关键字 Record, 意思是记录
  const bl11: Record<string, number> = {
    num: 1,
    age: 10
  }
  // 数据常用, 比如从后端获取的 JSON 数据, 大多是这种数据结构

  // 后端大多叫一条记录
  // 组装成数组
  const bl12: Record<symbol | number, symbol | number>[] = [
    {
      [Symbol('first')]: Symbol(1),
      2: Symbol(2),
      3: 3
    }
  ]

  // 用数组泛型写法
  const bl13: Array<Record<symbol | number, symbol>> = [
    { 1: Symbol(1) }
  ]

  // 索引签名, 不局限于只有某几个属性
  type LX8 = {
    [x: string]: string, // string | number 联合类型则不会报错
    city: string,
    // age: number,
  }
  // 加了特定属性后, 就必须存在该属性

  type JLLX = Record<string, number>
  // 和上面索引是一样的

  const bl17: LX8 = {
    1: '1',
    city: 'hehe',
    [Symbol(2)]: 2, // 这个我不懂为啥可以存在
  }
  // city 属性必须存在

  const bl18: JLLX = {
    1: 1,
    [Symbol(2)]: '2', // ???
  }

  // 使用模版字符串, 可以加某些模版
  type LX9 = {
    [x: `${number}_`]: boolean,
    [x: `_${number}`]: keyof any,
  }

  // 悬浮查看
  type JLLX2 = Record<`${number}_y`, keyof any>

  const bl19: LX9 = {
    '1_': true,
    '2_': false,
    _3: 3
  }






  // 当多个文件中的 type 声明报错(错误内容是重复声明), 可以在某文件中顶层加 {} 包裹住









  const user: User = {
    name: '后盾人',
    age: 18,
    open: true,
    lessons: [
      { title: 'linux' },
      { title: 'TS' }
    ]
  }



  // 常见的类型写法
  let hd9: {
    name: string,
    year: number
  } = {
    name: 'jlp',
    year: 29
  }


  // 借助 unknown 转换类型
  let hd10: string = ''
  let xj4: number = hd10 as unknown as number
  // 直接类型断言会报错, string 类型的变量不会赋值给 number 类型的变量

}