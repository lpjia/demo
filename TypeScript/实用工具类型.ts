{
  // 手写 Exclude
  type FX11<T, U> = T extends U ? never : T

  type LX11 = string

  type LH2 = string | number

  const bl3: FX11<LH2, LX11> = 0
  // 联合类型, 拆开来判断, 先得出 never | number,  再得出 number

  // 有关键字 Exclude, 意思是排除
  const bl4: Exclude<LH2, LX11> = 1
  // 从 LH2 中排除掉 LX11 中有的, 剩下来的是 number
  // 多个类型也适用

  const bl20: Exclude<string | number | boolean, symbol | boolean> = 2








  // 手写 Extract
  type FX21<T, U> = T extends U ? T : never

  type LH3 = string | number | boolean

  type LH4 = string | object

  const bl5: FX21<LH3, LH4> = ''
  // 先是 string | never | never | never | never | never, 再得出 string

  // 有关键字 Extract, 意思是提取
  const bl6: Extract<LH3, LH4> = ''
  // 从 LH3 中提取 LH4 中有的, 剩下来的是 string








  // 手写 Omit
  type FX<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P];
  }

  
  interface User {
    name: string;
    age: number;
    open: boolean;
    lessons: {
      title: string;
    }[];
  }

  const bl: FX<User, 'name' | 'age' | 'lessons'> = {
    open: true
  }

  // 有关键字 Omit, 意思是忽略
  type LX = Omit<User, 'age' | 'lessons'>
  // 从 User 中忽略 'age' 和 'lessons' 属性, 组成新的类型


  // 这里东西没完 start
  interface User2 {
    id: string,
    name: string,
    password: string,
    createTime: Date,
    updateTime: Date,
  }

  type RegisterUser = Omit<User2, 'id' | 'createTime' | 'updateTime'>

  interface UserUI extends Omit<User2, 'createTime'| 'updateTime'> {
    createTime: string,
    updateTime: string,
  }
  // 把所有都转成了 string 类型

  const bl_7: UserUI = {
    id: 'aaa',
    name: 'bbb',
    password: 'ccc',
    createTime: 'ddd',
    updateTime: 'eee'
  }



  // 手写 FilterValueType
  type FilterValueType<T, U> = {
    [K in keyof T]: T[K] extends U ? never : K
  }[keyof T]

  type LX3 = FilterValueType<User2, string>

  type LX4 = Pick<User2, LX3>







  type flter<T,U> = {
    //  [K in keyof T]:T[K]
    // [K in keyof T]: never
    [K in keyof T]: T[K] extends U ? never : K
  // }[keyof T]
  }[]
  type a = flter<User2, string>
  type filter<T> = { [x in keyof T]: never }[keyof T]


  // type FilterValueType<T, U> = {
  //   [K in keyof T]: T[K] extends U ? never : K
  // }[]

  // type FilterValueType<T, U> = {
  //   // keyof T 返回 'id' | 'name' 等联合类型
  //   [K in keyof T as Exclude<keyof T, U>]: T[K]
  //   // [K in keyof T]: T[K]
  // }

 

  // 参考
  type FXX<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P];
  }
  // end






  // 手写 Pick
  type FX3<T, U extends keyof T> = {
    [P in U]: T[P]
  }

  const bl8: FX3<User, 'name' | 'age'> = {
    name: '',
    age: 0
  }

  // 有关键字 Pick, 意思是选出
  type LX31 = Pick<User, 'open'>
  // 从 User 中选出 'open'属性, 组成新的类型

  const bl9: LX31 = { open: false }
  // 也可写到一起
  // const bl9: Pick<User, 'open'> = { open: false }









  // 手写 
  type FX_7<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: T[K]
  }
  // Capitalize 意思是首字母大写
  // Uncapitalize 首字母小写

  // Uppercase 意思是全大写
  // Lowercase 全小写

  type LX_15 = FX_7<User2>

  
  type A = User2[keyof User2]






  // 手写 Partial
  type FX4<T> = {
    [P in keyof T]?: T[P]
  }

  type LX5 = FX4<User>

  // 有关键字 Partial, 意思是部分的
  type LX41 = Partial<User>
  // 把 User 属性都变为可选属性

  const bl10: LX41 = { age: 0 }
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





  // 手写 Required
  type FX_2<T> = {
    [P in keyof T]-?: T[P]
  }

  interface JK {
    name?: string
    fn?: string
  }

  const bl_2: FX_2<JK> = {
    name: 'jk',
    fn: '限制 obj 的形状'
  }

  // 有关键字 Required, 意思是必须的
  const bl_3: Required<JK> = {
    name: 'jk',
    fn: '限制 obj 的形状'
  }
  // 把可选属性变为必须属性

  type FX_4 = Required<LX41>






  // 手写 Readonly
  type FX_3<T> = {
    readonly [P in keyof T]: T[P]
  }

  interface Todo {
    name: string
  }

  const bl_4: FX_3<Todo> = {
    name: '变量4'
  }
  // bl_4.name = ''
  // 报错, 只读属性不可改变值

  // 有关键字 Readonly, 意思是只读
  const bl_5: Readonly<Todo> = {
    name: '变量4'
  }




  // 手写移除只读属性
  // 15:49 2022/5/28 内置库还没有
  type RemoveReadonly<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type LX_2 = Readonly<Todo>

  type LX_3 = RemoveReadonly<LX_2>

  const bl_6: LX_3 = {
    name: '旧值'
  }

  bl_6.name = '新值'

  
  
  






  // 手写 NonNullable
  type FX_5<T> = T extends null | undefined ? never : T

  type LX_6 = string | null | number | undefined | boolean

  type LX_4 = FX_5<LX_6>

  // 有关键字 NonNullable, 意思是不为空的
  type LX_5 = NonNullable<LX_6>
  // 把所有 null 和 undefined 类型都过滤掉







  // 手写 ReturnType
  type FX_6<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  type LX_7 = () => string

  type LX_8 = FX_6<LX_7>

  // 有关键字 ReturnType, 意思是获取函数的返回类型
  type LX_9 = ReturnType<LX_7> // string

  type LX_10 = ReturnType<<T>() => T> // unknown
  type LX_13 = ReturnType<null> // unknown
  type LX_14 = ReturnType<undefined> // unknown

  type LX_11 = ReturnType<any> // any
  
  type LX_12 = ReturnType<never> // never





}