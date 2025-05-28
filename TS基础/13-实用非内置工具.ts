interface Todo {
  name: string
  age?: number
  like?: boolean
}





/* RemoveReadonly 类型, 所有属性都移除只读标记 */

type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P]
}
type Tp1_1 = Readonly<Todo>
type Tp1_2 = RemoveReadonly<Tp1_1>
let readonlyTodo: Tp1_1 = {
  name: 'ming_zi',
  age: 12
}
// readonlyTodo.age = 18 // 报错

let readonlyTodo2: Tp1_2 = {
  name: 'ming_zi2',
  age: 122
}
readonlyTodo2.age = 18 // 不报错






/* Optional 类型, 把某些key变为可选 */

interface Article {
  title: string
  content: string
  author: string
  date: string
  readCount: number
}
type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type CreateArticleOptions = Optional<Article, 'author' | 'date' | 'readCount'>
type Tp81 = ShowMe<CreateArticleOptions>
function createArticle(options: CreateArticleOptions) {
  // options.
}






/* GetOptional 类型, 只获取可选的key */

type GetOptional<T> = {
  // [P in keyof T]: T[P] // 原版的获取类型的属性和值
  // [P in keyof T as never]: T[P] // 把key去掉, 那么值也没了, 变为{}
  // [P in keyof T as 该属性为必填属性 ? never : P]: T[P] // 去掉必填属性, 得到想要的可选属性
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P]
  // T[P] extends Required<T>[P] 不好理解, 看下面
}
type Tp3_1 = ShowMe<GetOptional<CreateArticleOptions>>

type UserA = {
  // name: string
  age?: number
}
type UserB = {
  // name?: string
  age: number
}
type Tp3_2 = UserA extends UserB ? true : false
type Tp3_3 = {} extends { anykey: never } ? true : false
type Tp3_6 = { anykey: never } extends { anykey: never } ? true : false
// 只有可选属性(不管几个)等价于无属性, 类型范围是一样的
type Tp3_4 = {} extends { anykey?: never } ? true : false
type Tp3_5 = { anykey?: never } extends {} ? true : false
/* ?该键上不存在运算符
T[P] extends Required<T>[P] 这个条件解释
T[P]看作{key: any}
Required<T>[P]看作{key: any}
必有属性的范围窄, 可选属性的范围宽
先看4 5, 再看3 6 */







/* GetRequired 类型, 只获取必有的key */

type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P]
};
type Tp4_1 = ShowMe<GetRequired<CreateArticleOptions>>







/* DeepReadonly 类型, 不可变类型, 深度的也可以控制 */

type DeepReadonly<T extends Record<string | symbol, any>> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

interface O {
  a: number
  b: string
  c: boolean
  d: {
    dd: boolean
  }
}
type Tp2_1 = ShowMe<DeepReadonly<O>>
let o: Readonly<O> = {
  a: 1,
  b: '2',
  c: true,
  d: {
    dd: false
  }
}
// o.a = 11 // 报错
// o.d.dd = true // 不报错, Readonly只能控制第一层

let oDeep: DeepReadonly<O> = {
  a: 1,
  b: '2',
  c: true,
  d: {
    dd: false
  }
}
// oDeep.a = 22 // 报错
// oDeep.d.dd = true // 报错, DeepReadonly起作用了







/* ExcludeKeyof 类型, 排除一参中(keyof 一参)的 类型为二参的key, 最后得到联合类型, 所以命名借鉴keyof(映射成属性名的联合类型) */

type ExcludeKeyof<T, U> = {
  [K in keyof T]: T[K] extends U ? never : K
}[keyof T]

interface User2 {
  id: string,
  name: string,
  password: string,
  createTime: Date,
  updateTime: Date,
}
type LianHe = ExcludeKeyof<User2, Date>
type Fei_U = Pick<User2, LianHe>







/* OmitValue 类型, 省略对象类型中某些类型的值的key */

type OmitValue<T, U> = Pick<T, ExcludeKeyof<T, U>>
// 和Fei_U的结果一样, 灵感来自这
type Fei_U2 = OmitValue<User2, Date>
