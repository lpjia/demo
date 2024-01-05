export { }


interface Car {
  name: string
  brand: string // 品牌
}

// 类型操作符
// keyof 常用于对象类型, 得到key的联合类型
type CarKeysUnion = keyof Car // 'name' | 'brand' 都是常量
type CarKeysUnionShow = ShowMe<keyof Car>
let car: CarKeysUnion = 'brand' // 字符串字面量类型的值只能是它本身

/* 字符串字面量类型
提取字符串字面量的类型时, 看它具体是什么类型
可能是推导、断言、用户定义 */
type CarT = typeof car
// 推导出的string类型
let xy = 'xy'
type XyT = typeof xy
// 加类型断言, 得到的类型就变了
let xyz = 'xy' as 'xyz'
type XyzT = typeof xyz



interface Todo {
  name: string
  like: boolean,
  open: boolean;
  lessons: {
    title: string;
  }[];
}
/* 看区别, 有意思的来了 */
type A1 = ShowMe<keyof (Car | Todo)>
type A2 = ShowMe<keyof Car | keyof Todo>
/* 看"联合类型和交叉类型的本质" */
type A3 = ShowMe<keyof (Car & Todo)>



/* 索引签名
索引签名参数类型必须是 “string”、“number”、“symbol”或模板文本类型。 */
// 不能提前知道所有属性的名字，但是知道这些值的特征
interface CarKeys {
  // 可写一个或多个, 对应不同的情况
  [props: string]: string // 单独这个, CarKeysK类型为string | number, 直观难理解, 其实想到js的属性名可以用数字(会被隐式转为数字字符串), 比如{carName: '奔驰', 1: '编号'}, 恍然大悟, ts其实尽可能兼容js的写法, 所以得到联合类型
  // [props: number]: string // 单独这个, CarKeysK类型为number, 符合直观
  // [props: symbol]: string // 单独这个, CarKeysK类型为symbol, 符合直观

}
type CarKeysK = keyof CarKeys
type CarKeysKShow = ShowMe<keyof CarKeys>
let car2: CarKeys = {
  speed: 'fast'
}
let car3: CarKeysK = 'xxx'


type P = {
  // 遍历每一个联合类型的成员
  [K in CarKeysK]: boolean
}
let p: P = {
  a: true,
  0: false
}




// 两个有意思的
type AnyKeyof = keyof any
type NeverKeyof = keyof never
// 几个never
type UnknownKeyof = keyof unknown
type ObjectKeyof = keyof object
type NullKeyof = keyof null
type UndefinedKeyof = keyof undefined
// 基础类型
type StringKeyof = keyof string
type NumberKeyof = keyof number
type BooleanKeyof = keyof boolean
type SymbolKeyof = keyof symbol
type FunctionKeyof = keyof Function
type FunctionKeyofShow = ShowMe<keyof Function>





// ----比较重要 s----

/* js类型映射 */
type JSTypeMap = {
  'string': string,
  'number': number,
  'boolean': boolean,
  'object': object,
  'function': Function,
  'symbol': symbol,
  'undefined': undefined,
  'bigint': bigint,
}
type JSTypeName = keyof JSTypeMap
type JSTypeNameShow = ShowMe<keyof JSTypeMap>


/* keyof 数组类型
keyof取的还是数组类型的key组成的联合类型
数组类型的key有索引(number)和若干属性 */
type KeyofArrayTp = keyof string[]
type KeyofArrayTpShow = ShowMe<keyof string[]>


/* keyof 联合类型的数组类型
和数组类型一样 */
type LianHeShuZuType = keyof JSTypeName[]
type LianHeShuZuTypeShow = ShowMe<keyof JSTypeName[]>

/* in 联合类型 */
type JSTypeStringMap = {
  [K in JSTypeName]: K
}

/* 泛型
I in keyof 数组类型
遍历数组, 得到下标, I是number类型 */
type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: I // 遍历数组, 得到下标I, I是number类型
}
type TryTp = ArgsType<JSTypeName[]>

type ArgsType2<T extends JSTypeName[]> = {
  [I in keyof T]: T[I]
}
type TryTp2 = ArgsType2<JSTypeName[]>
/* type TryTp2 = (keyof JSTypeMap)[]
看这个结果可以知道怎么手写类型 (keyof JSTypeMap)[] */
let val: TryTp2 = ['string', 'number', 'symbol'] // 值取联合类型的项


/* 想要JSTypeMap对应的类型, 比如
'string' -> string */
type ArgsType3<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]]
}
type TryTp3 = ArgsType3<JSTypeName[]>
let val3: TryTp3 = [1, '2', true, Symbol('这是symbol')]

// ----比较重要 e----





/* 与有类型的getValue函数对比
参1无法确定是 obj 是一个 object
参2无法保证准确提示 obj 的 key 给编码者, 无法约束 key
无法确定返回值的类型

function getValue(obj, k) {
  return obj[k]
} */

// 一个实战案例:获取某对象属性的值, 加上约束, 会有智能提示, 解决上述的3个问题
function getValue<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
const user = {
  id: 15,
  name: 'John',
  email: 'john@qq.com',
  role: 'admin'
}
console.log(getValue(user, 'id'))

/* Object 和 object 在这的区别:
object 是TypeScript v2.2引入的一种非基本类型，不能被赋予原始值(比如字符串 数值 布尔值)
Object 是对TypeScript对JavaScript Object.prototype原型对象的定义，是所属对象类型的顶层类型，即所有对象类型都继承了Object中定义的属性/方法。
同时，由于JavaScript的拆箱装箱机制，Object类型的变量可以被赋予原始值，而基本类型也可以访问Object中定义的属性/方法。
{} 是一个没有任何成员的对象类型，它可以访问Object中定义的属性/方法，也可以被赋予原始值。
在约束对象类型时，我们应该始终使用object！
TypeScript的原始类型（number、string、bigint、boolean、symbol、null、undefined、object）, 在开发中，我们应当始终使用这些原始类型 */