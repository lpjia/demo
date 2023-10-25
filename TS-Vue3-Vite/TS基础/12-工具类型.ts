export { }

/* https://www.typescriptlang.org/docs/handbook/utility-types.html */



/* Partial 类型, 所有属性都设置为可选 */

interface Td {
  title: string
  description: string
  completed: boolean
}

let pa: Partial<Td> = {
  title: 'pa',
}
type Tp11 = ShowMe<Partial<Td>>

type KeyPa = keyof Td // "title" | "description" | "completed"
type Tp12 = ShowMe<KeyPa>
let keyPa: KeyPa = 'description'





/* Required 类型, 所有属性都设置为必填, 与Partial相反 */

interface Todo {
  name: string
  age?: number
  like?: boolean
}

let re: Required<Todo> = {
  name: 're',
  age: 33,
  like: false
}
type Tp21 = ShowMe<Required<Todo>>






/* Readonly 类型, 所有属性都只读, 不可变类型, 只能控制一层, 类似浅拷贝 */

let re2: Readonly<Todo> = {
  name: 're'
}
// 属性只读, 不能改
// re2.name = ''
type Tp31 = ShowMe<Readonly<Todo>>







/* Pick 类型, 从对象类型挑选出一些属性组成新的类型 */

let re3: Pick<Todo, 'like'> = {
  like: false
}
type Tp41 = ShowMe<Pick<Todo, 'like'>>
type Tp42 = Pick<Td, 'title' | 'description'>
type Tp43 = ShowMe<Td>






/* Omit 类型, 省略对象类型中某些key */

let res4: Omit<Todo, 'age' | 'like'> = {
  name: 'res4'
}
type Tp51 = ShowMe<Omit<Todo, 'age' | 'like'>>
interface User {
  name: string;
  age: number;
  open: boolean;
  lessons: {
    title: string;
  }[];
}
type LianHe3 = Omit<User, 'name' | 'age' | 'lessons'>
interface User2 {
  id: string,
  name: string,
  password: string,
  createTime: Date,
  updateTime: Date,
}
type RegisterUser = Omit<User2, 'id' | 'createTime' | 'updateTime'>
const registerUser: RegisterUser = {
  name:'熊大',
  password: '123456',
}
type OmitTimeType = Omit<User2, 'createTime' | 'updateTime'>
// 把所有字段都转成了 string 类型
interface UserUI extends OmitTimeType {
  createTime: string,
  updateTime: string,
}
type UserUIShow = ShowMe<UserUI>
const userUI: UserUI = {
  id: 'aaa',
  name: 'bbb',
  password: 'ccc',
  createTime: 'ddd',
  updateTime: 'eee',
}
type A = ShowMe<keyof User2>







/* Parameters 类型, 从函数中提取参数的类型, 传的是函数类型而不是函数本身 */

declare function f1(arg: Td, arg2: { heihei: any }): void;

type ParametersTp = Parameters<typeof f1> // 返回的是元组, 可用索引来获取
type Tp61 = ShowMe<ParametersTp>
type Tp62 = ShowMe<ParametersTp[0]>
type Tp64 = ParametersTp[1]

type NoParameters = Parameters<() => string>
type Tp63 = NoParameters

type Par = Parameters<(s: string) => number>
type Tp65 = ShowMe<Par>
type Tp66 = Par[0]






/* ReturnType 类型, 从函数中提取返回值的类型, 传的是函数类型而不是函数本身 */

type ReturnTp = ReturnType<typeof f1>
type Tp71 = ReturnTp

type Tp72 = ReturnType<() => string>

type Tp73 = ReturnType<(s: string) => number>

// 几种特殊情况
type Tp74 = ReturnType<<T>() => T> // unknown
type Tp75 = ReturnType<any> // any
type Tp76 = ReturnType<never> // never
// 这几个报错
// type Tp78 = ReturnType<null>
// type Tp78 = ReturnType<undefined>
// type Tp78 = ReturnType<unknown>
// type Tp78 = ReturnType<string>






/* Record 类型, 构造一个对象类型 */

type ObjTp = Record<symbol, string>
const obj: Record<symbol, string> = {
  [Symbol(1)]: '1',
}

type CommonTp = Record<string, any>
const commonTp: CommonTp = {
  name: 'xj',
  age: 18,
  [Symbol('first')]: 1 // 不懂为啥不报错? 因为key定义的string, 没有symbol类型
}

interface CatInfo {
  age: number;
  breed: string;
}
type CatName = "miffy" | "boris" | "mordred";
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
type Rec = ShowMe<Record<CatName, CatInfo>>
// 数组
type Arr = CatInfo[]
type ArrTp = ShowMe<Arr>
const arr: Arr = [
  { age: 10, breed: "Persian" },
  { age: 5, breed: "Maine Coon" },
  { age: 16, breed: "British Shorthair" },
]







/* NonNullable 类型, 从中排除所有的null、undefined的类型 */

type Tp1_1 = string | null | number | undefined | boolean
type Tp1_2 = NonNullable<Tp1_1>






/* Extract 类型, 提取一参中所有可以赋给二参的类型 */

type LianHeType = string | number | boolean | symbol
// 联合类型, 拆开来判断, 先得出 string | never | never | never | never | never | never | never, 再得出 string
type Ti_Qu = Extract<LianHeType, string | object>






/* Exclude 类型, 排除一参中所有可以赋给二参的类型 */

// 联合类型, 拆开来判断, 先得出 string | number | never, 再得出 string | number
type Pai_Chu = Exclude<string | number | boolean, symbol | boolean>


