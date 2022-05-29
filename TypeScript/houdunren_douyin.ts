{

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