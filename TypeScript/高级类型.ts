{

  interface User {
    name: string;
    age: number;
    open: boolean;
    lessons: {
      title: string;
    }[];
  }

  // keyof
  // TypeScript中的keyof操作符，是将一个类型映射为它所有成员名称的联合类型
  type LH5 = keyof User
  // 'name' | 'age'| 'open' | 'lessons'

  // keyof 获取属性名称的联合类型
  // 再 [], 获取属性名称的值的类型
  type LH_2 = User[keyof User]

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

  type LX7 = typeof bl15 // 对象
  // type A = keyof bl15

  // 这是 DY 教的一种确保, 不过没有约束 key, 不够完美
  function getVal3(obj: object, k: string) {
    return obj[k as keyof typeof obj]
  }









  // in 用于取联合类型的值, 不能用于 interface
  type LX2 = {
    [key in LH5]: string
  }
  // 鼠标悬浮查看会发现把联合类型遍历了










  // infer 意思是推断, 可以用来解包
  // 仅条件类型的 "extends" 子句中才允许 "infer" 声明
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
  // 如果T是某个待推断类型的数组，则返回推断的类型(R 用来存储被推断的类型)，否则返回T
  // infer 声明的类型变量只在条件类型的"真值"分支中可用

  type IdType_2 = Unpack_2<Ids>
  type NameType_2 = Unpack_2<Names>
  type IsMaleType_2 = Unpack_2<IsMales>




  // 想要获取一个Promise<xxx>类型中的xxx类型
  type Response = Promise<number[]>

  type Unpack_3<T> = T extends Promise<infer R> ? R : T

  type resType = Unpack_3<Response>





  // infer推断联合类型
  type Foo<T> = T extends {
    a: infer U,
    b: infer U
  } ? U : never

  type T10 = Foo<{
    a: string,
    b: string
  }>

  type T11 = Foo<{
    a: string,
    b: number
  }>

  type T12 = Foo<{
    a: string,
    b: number | boolean
  }>

  type T13 = Foo<{
    a: boolean,
    b: keyof any
  }>





  // 将元组转为联合类型
  type TupleToUnion<T> = T extends (infer R)[] ? R : never

  type LX_tuple = [string, number, boolean, string, symbol, number];

  type LX_union = TupleToUnion<LX_tuple>




}