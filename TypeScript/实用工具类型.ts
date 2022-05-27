{
  type FX<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P];
  }

  const bl: FX<User, 'name' | 'age' | 'lessons'> = {
    open: true
  }

  // 有关键字 Omit, 意思是忽略
  type LX = Omit<User, 'age' | 'lessons'>
  // 从 User 中忽略 'age' 和 'lessons' 属性, 组成新的类型





  //






  // infer 解包
  // 想要获取数组里的元素类型
  type Ids = number[]
  type Names = string[]
  type IsMales = boolean[]

  // 繁琐处理
  type Unpack<T> =
    T extends Names ? string :
    T extends IsMales ? boolean :
    T extends Ids ? number : T

  type IdType = Unpack<Ids> // 类型为 number
  type NameType = Unpack<Names> // 类型为 string
  type IsMaleType = Unpack<IsMales> // 类型为 boolean
  // 可以看出比较繁琐

  // 用 infer 来解包
  type Unpack_2<T> = T extends (infer R)[] ? R : T
  // 如果T是某个待推断类型的数组，则返回推断的类型，否则返回T

  type IdType_2 = Unpack_2<Ids>
  type NameType_2 = Unpack_2<Names>
  type IsMaleType_2 = Unpack_2<IsMales>





  type Response = Promise<number[]>

  type Unpack_3<T> = T extends Promise<infer R> ? R : T

  type resType = Unpack_3<Response>















  interface User2 {
    id: string,
    name: string,
    password: string,
    createTime: Date,
    updateTime: Date,
  }

  type RegisterUser = Omit<User2, 'id' | 'createTime' | 'updateTime'>

  interface UserUI extends RegisterUser {
    createTime: string,
    updateTime: string,
  }

  // const

  type FX2<T, U> = {
    [K in keyof T]: T[K] extends U ? never : K
  }[keyof T]

  type LX3 = FX2<User2, string>




  type flter<T> = {
    //  [K in keyof T]:T[K]
    [K in keyof T]: never
  }[keyof T]
  type a = flter<User2>
  type filter<T> = { [x in keyof T]: never }[keyof T]


  // type FilterValueType<T, U> = {
  //   [K in keyof T]: T[K] extends U ? never : K
  // }[]

  // type FilterValueType<T, U> = {
  //   // keyof T 返回 'id' | 'name' 等联合类型
  //   [K in keyof T as Exclude<keyof T, U>]: T[K]
  //   // [K in keyof T]: T[K]
  // }

  type LX4 = Pick<User2, LX3>

  // 参考
  type FXX<T, K extends string | number | symbol> = {
    [P in Exclude<keyof T, K>]: T[P];
  }

}