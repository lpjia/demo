export { }

/* https://www.typescriptlang.org/docs/handbook/utility-types.html */



/* Partial 类型, 所有属性都设置为可选 */

interface Pa {
  name: string
  age: number
}

let pa: Partial<Pa> = {
  name: 'pa',
}
type Tp11 = ShowMe<Partial<Pa>>

type KeyPa = keyof Pa // 'name' | 'age'
type Tp12 = ShowMe<KeyPa>
let keyPa: KeyPa = 'age'





/* Required 类型, 所有属性都设置为必填 */

interface Re {
  name: string
  age?: number
  like?: boolean
}

let re: Required<Re> = {
  name: 're',
  age: 33,
  like: false
}
type Tp21 = ShowMe<Required<Re>>






/* Readonly 类型, 所有属性都只读, 不可变类型, 只能控制一层, 类似浅拷贝 */

let re2: Readonly<Re> = {
  name: 're'
}
// 属性只读, 不能改
// re2.name = ''
type Tp31 = ShowMe<Readonly<Re>>





/* Pick 类型, 挑选出一些属性组成新的类型 */

let re3: Pick<Re, 'like'> = {
  like: false
}
type Tp41 = ShowMe<Pick<Re, 'like'>>





/* Omit 类型, 排除某些key */

let res4: Omit<Re, 'age' | 'like'> = {
  name: 'res4'
}
type Tp51 = ShowMe<Omit<Re, 'age' | 'like'>>



/* Parameters 类型, 从函数中提取参数的类型, 传的是函数类型而不是函数本身 */

declare function f1(arg: Pa, arg2: { heihei: any }): void;

type ParametersTp = Parameters<typeof f1> // 返回的是元组, 可用索引来获取
type Tp61 = ShowMe<ParametersTp>
type Tp62 = ShowMe<ParametersTp[0]>
type Tp64 = ShowMe<ParametersTp[1]>

type NoParameters = Parameters<() => string>
type Tp63 = ShowMe<NoParameters>

type Par = Parameters<(s: string) => number>
type Tp65 = ShowMe<Par>




/* ReturnType 类型, 从函数中提取返回值的类型, 传的是函数类型而不是函数本身 */

type ReturnTp = ReturnType<typeof f1>
type Tp71 = ShowMe<ReturnTp>

type RetTp = ReturnType<() => string>

type RetuTp = ReturnType<(s: string) => number>





/* Record 类型, 构造一个对象类型 */

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






/* -------------非内置工具类型---------------------------- */


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

let o: DeepReadonly<O> = {
  a: 1,
  b: '2',
  c: true,
  d: {
    dd: false
  }
}
// o.a = 11 // 报错
// o.d.dd = true // 不报错, Readonly只能控制第一层