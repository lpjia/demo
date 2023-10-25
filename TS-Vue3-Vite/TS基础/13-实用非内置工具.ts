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
