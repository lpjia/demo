export { }

// 类型操作符
// typeof 获取值的类型
let car: 'brand' | 'name' = 'brand' // 字符串字面量类型的值只能是它本身

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



// typeof提取枚举的类型
// 枚举的值是number类型
enum HttpMethod {
  GET,
  POST
}
type Methods = typeof HttpMethod
type MethodsShow = ShowMe<typeof HttpMethod>
const meth: Methods = {
  GET: 10,
  POST: 5
}
// 然后keyof再取联合类型
type EnumToUnion = keyof (typeof HttpMethod)
function fn(p: EnumToUnion) { }
fn('GET')
fn('POST')




// typeof提取数组的类型
const myArr = ['name', 'age', 'sex']
type MyArr = typeof myArr
type MyArrItem = typeof myArr[number]
const myArr2 = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
]
type MyArr2 = typeof myArr2
type MyArrItem2 = typeof myArr2[number]




// 函数实现
// 可以在参数列表里使用元组
function func<T extends unknown[]>(
  arr: [...{
    [I in keyof T]: T[I]
  }]
): T {
  return arr
}

func(['123', 1])
func(['name', 10, true, 2, false])



const myTuple = [true, 10, 'name', 1, 'age']
// 用类型推断, 可以学习infer
type Item<T> = T extends (infer R)[] ? R : never
type Tp = Item<typeof myTuple>
// 用[], 更简洁
type Item2 = typeof myTuple[number]



/* 给一个数组字面量const断言，会被推断为 readonly 元组类型
typeof 该值, 得到只读的字面量元组类型 */
const myTupleAsConst = ['name', 10, true] as const
type MyTupleAsConst = typeof myTupleAsConst
let myTupleAsConst2: MyTupleAsConst = ["name", 10, true]

{
  const myTupleAsConst = ['name', 'age', 'sex'] as const
  type MyTupleAsConst = typeof myTupleAsConst
  let myTupleAsConst2: MyTupleAsConst = ["name", 'age', 'sex']
}

{
  const myTupleAsConst = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ] as const
  type MyTupleAsConst = typeof myTupleAsConst
  let myTupleAsConst2: MyTupleAsConst = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]
}




/* ReadonlyArray<Type> 提供了更简短的写法 readonly Type[]
根据名字ReadonlyArray可知还是个数组类型, 非元组类型 */
type ZhiDu = ReadonlyArray<string>
type ZhiDu2 = readonly number[]
// readonly 元组
type ZhiDu3 = readonly [string, symbol, boolean, number]
const zhiDu: ZhiDu3 = ['abc', Symbol('cf'), true, 1]


/* 几种错误写法 */
// type Tp = readonly string
// type Tp = readonly Array<string>




type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
const a2: StringNumberBooleans = ['a', 1, true, false]
const a3: StringBooleansNumber = ['b', true, false, 2]
const a4: BooleansStringNumber = [true, false, 'c', 2]