export { }

// brand 品牌
interface CarItf {
  name: string
  brand: string
}

// 类型操作符
// keyof 获取的是联合类型
type CarKeys = keyof CarItf // 'name' | 'brand' 都是常量
let car: CarKeys = 'brand' // 常量的值只能是它本身
console.log(car)


// 怎么写任意字符串? 不局限于上面的两个key
interface Car2Itf {
  [p: string]: string
}
type Car2Keys = keyof Car2Itf
let car2: Car2Keys = 'xxx'
console.log(car2)

type StrOrNum = Car2Keys
type P = {
  [k in StrOrNum]: boolean
}
let p: P = {
  aaa: true,
  0: false
}
console.log(p)

// 两个有意思的
type AnyKeyof = keyof any
type UnknownKeyof = keyof unknown
// 基础类型
type BaseString = keyof string
type BaseNumber = keyof number
type BaseBoolean = keyof boolean
type BaseSymbol = keyof symbol
type BaseObject = keyof object





// 类型操作符
// typeof 获取值的类型
type CarTypeof = typeof car // 常量的typeof还是常量
type Car2Typeof = typeof car2 // 变量的typeof是正确的类型

let car_: CarTypeof = 'brand'
let car2_: Car2Typeof = 'xyz'

// typeof提取对象的类型
let car3 = {
  name: '轿车',
  brand: '比亚迪'
}
type Car3Typeof = typeof car3
let car4: Car3Typeof = {
  name: 'SUV',
  brand: '吉利'
}

// typeof提取对象的类型
let lolo = {
  name: 'zhanhsan',
  age: 18,
  child: {
    name: 'zhangsansan',
    like: true,
    age: 12
  }
};
type Lolo = typeof lolo
type Lolochild = typeof lolo.child


// typeof提取数组的类型
const myArr = ['name', 'age', 'sex']
type MyArr = typeof myArr

// 给一个数组字面量 const 断言，会被推断为 readonly 元组类型
// 为啥? 因为数组字面量并不能保证item是同一种类型, 所以推断为元组类型更适合
const myArr2 = ['name', 'age', true] as const
type MyArr2 = typeof myArr2
// type MyArr3 = readonly string // 报错, 仅允许对数组和元组字面量类型使用 "readonly" 类型修饰符

type a = ReadonlyArray<string>

// typeof提取枚举的类型
// 枚举默认 值是number类型
enum HttpMethod {
  GET,
  POST
}
type Methods = typeof HttpMethod
const meth: Methods = {
  GET: 10,
  POST: 5
}
// 然后keyof再取联合类型
type EnumToUnion = keyof (typeof HttpMethod)
function fn(p: EnumToUnion) { }
fn('GET')
fn('POST')




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
// as const 是 const类型断言
// 使用 as const 将数组变为 readonly 的元组类型
// 但此时 APP 还是一个值，我们通过 typeof 获取 APP 的类型
type TypeOfAPP = typeof APP
// 最后在通过索引访问类型，获取字符串联合类型
type App = TypeOfAPP[number]
// 简写
type App2 = typeof APP[number]

// 一个实战案例:获取某对象的属性, 加上约束, 会有智能提示
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
const user = {
  id: 15,
  name: 'John',
  email: 'john@qq.com',
  role: 'admin'
}
console.log(getProperty(user, 'email'))