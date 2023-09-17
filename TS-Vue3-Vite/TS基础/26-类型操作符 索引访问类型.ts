export { }

// 类型操作符
// [] 索引访问 访问属性的类型, 和访问对象的属性是一样的语法
type User = {
  id: number
  name: string
  address: {
    street: string
    city: string
    country: string
  }
}
type Params = {
  id: User['id']
  address: User['address']
}
// 访问嵌套属性的类型
type City = User['address']['city']
// 通过联合类型一次性获取多个属性的类型
type IdOrName = User['id' | 'name']
// 通过keyof和联合类型一次性获取所有属性的类型
type UserToUnion = User[keyof User]
// keyof User 获取User所有属性组成的联合类型 'id' | 'name' | 'address'
// type UserToUnion2 = User['id' | 'name' | 'address']

// 换种不常见写法, 习惯习惯
// type A = 'id' | 'name' | 'address'
// type UserToUnion3 = User[A]







const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
// 获取数组元素的类型, []的number是因为数组的索引就是number类型
type Person = typeof MyArray[number]; // 其实是(typeof MyArray)[number]
// 获取数组类型
type MyArrayType = typeof MyArray

type Age = typeof MyArray[number]['age']
type Name = Person['name']

// 作为索引的只能是类型
// type Person2 = MyArray[number] // 此处MyArray表示值, 不是类型
// const key = 'age'; type Age2 = Person[key] // key是变量, 不能用作类型

// 可用类型别名
type Key = 'age'
type Age2 = Person[Key]

// 一个实战案例:一个页面要用在不同的APP, 根据APP的不同, 调用的底层API不同
// const APP = ['TaoBao', 'Tmall', 'Alipay'];
// 想使用约束
// type App = 'TaoBao' | 'Tmall' | 'Alipay'; // 写两遍感觉冗余
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const;
// as const 是 const类型断言, 可以将对象的属性或数组的元素设置为只读, 类型不会扩大
// 使用 as const 将数组变为 readonly 的元组类型
// 但此时 APP 还是一个值，我们通过 typeof 获取 APP 的类型
type TypeOfAPP = typeof APP
// 最后在通过索引访问类型，获取字符串联合类型
type App = TypeOfAPP[number]
// 简写
type App2 = typeof APP[number]







/* 字符串字面量组成的联合类型
需求是约束p、q是相同的字符串字面量 */
type A = 'a1' | 'a2' | 'a3'

{
  // 推荐
  // 联合类型A, [K in A] 会遍历A的所有成员
  type B = {
    [K in A]: { p: K, q: K }
  }[A]

  // 作为对比, B1得到对象类型, 每个key都对应一个{ p: K, q: K }
  type B1 = {
    [K in A]: { p: K, q: K }
  }
  // A是联合类型, 所以索引访问类型会遍历每个成员, 得到的也是联合类型
  type B2 = B1[A]

  // const b1: B = {
  //   p: 'a1',
  //   q: 'a2',
  // }
  const b2: B = {
    p: 'a1',
    q: 'a1',
  }
  const b3: B = {
    p: 'a2',
    q: 'a2',
  }
}

{
  // 裸类型参数 https://zhuanlan.zhihu.com/p/526988538
  // T extends any, 该参数是联合类型时, 遍历每一个联合类型的成员
  // T extends T, 用三元运算, 在这也是为了遍历联合类型的成员 
  type Make<T extends any> = T extends T ? { p: T, q: T } : never
  type B = Make<A>

  // 报错
  // const b1: B = {
  //   p: 'a1',
  //   q: 'a2',
  // }
  const b2: B = {
    p: 'a1',
    q: 'a1',
  }
  const b3: B = {
    p: 'a2',
    q: 'a2',
  }
}

{
  // 这个方法必须要手动传入一个泛型参数, 无法自动推导, 不好用
  type B<T extends A> = {
    p: T,
    q: T,
  }
  // // 泛型类型“B”需要 1 个类型参数。
  // const b1: B = {
  //   p: 'a1',
  //   q: 'a1',
  // }
  const b2: B<'a1'> = {
    p: 'a1',
    q: 'a1',
  }
}