export { }

// https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md


/* ----类型体操---- */


{
  /* 联合转元组 */

  /**
   * 将联合类型转为对应的交叉函数类型
   * @template U 联合类型
   */
  type UnionToInterFunction<U> =
    (U extends any ? (k: () => U) => void : never) extends
    ((k: infer I) => void) ? I : never

  /**
   * 获取联合类型中的最后一个类型
   * @template U 联合类型
   */
  type GetUnionLast<U> = UnionToInterFunction<U> extends { (): infer A; } ? A : never

  /**
   * 在元组类型中前置插入一个新的类型（元素）；
   * @template Tuple 元组类型
   * @template E 新的类型
   */
  type Prepend<Tuple extends any[], E> = [E, ...Tuple]

  /**
   * 联合类型转元组类型；
   * @template Union 联合类型
   * @template T 初始元组类型
   * @template Last 传入联合类型中的最后一个类型（元素），自动生成，内部使用
   */
  type UnionToTuple<Union, T extends any[] = [], Last = GetUnionLast<Union>> = {
    0: T;
    1: UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>
  }[[Union] extends [never] ? 0 : 1]


  const myTuple = [10, { id: 1, name: 'abc' }, 'name', 'age']
  type Keys = typeof myTuple[number]
  type R1 = UnionToTuple<Keys>
  // 因为联合类型没有次序和不重复, 所以转元组后, myTuple和r的元组项对应不上
  // 这个体操没实用价值, 因为元组本来就有次序和固定长度
  const r: R1 = ['name', 10, { id: 1, name: 'abc' }]
  // const r: R1 = [10, { id: 1, name: 'abc' }, 'name'] // 报错


  // 当元组有布尔类型的值时, 转之后R2布尔类型1个变2个
  const myTuple2 = [true, 12, 'name', 'age', 'gender']
  type Keys2 = typeof myTuple2[number]
  type R2 = UnionToTuple<Keys2>
}

{
  /* 元组转对象 */
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  type TupleToObject<T extends readonly (keyof any)[]> = {
    [P in T[number]]: P
  }

  type result = TupleToObject<typeof tuple>
  // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}


  type Tuple = typeof tuple
  type Item = typeof tuple[number]
}

{
  /* 联合转交叉 */
  type UnionToCross<T> =
    (
      T extends any ? (x: T) => void
      : never
    ) extends ((x: infer R) => void) ? R
    : never;

  type P = { id: number } | { name: string }
  type Result = UnionToCross<P>
  const result: Result = {
    id: 1,
    name: 'abc'
  }

  // 该联合转交叉后, 没有符合的类型
  type NoTp = UnionToCross<{ id: number } | { id: string }>
  type NoTpShow = ShowMe<NoTp>
  // const no: NoTp = { id: 1 } // 报错, 无法给一个never类型赋值
}


/* ----手写系列---- */


/* 手写 Pick */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
/* Pick<Type, Keys>
从Type类型里面挑了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型) */




/* 手写 Readonly */
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
/* Readonly<Type>
构造一个Type下面的所有属性全都设置为只读的类型 */





/* 手写 Partial */
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}
/* Partial<Type>
构造一个Type下面的所有属性都设置为可选的类型 */





/* 手写 Required */
type MyRequired<T> = {
  [K in keyof T]-?: T[K]
}
/* Required<Type>
构造一个Type下面的所有属性全都设置为必填的类型 */





/* 手写 Exclude */
type MyExclude<T, U> = T extends U ? never : T;
/* Exclude<UnionType, ExcludedMembers>
从UnionType联合类型里面排除了所有可以赋给ExcludedMembers的类型 */




/* 手写 Extract */
type MyExtract<T, U> = T extends U ? T : never
/* Extract<Type, Union>
从Type类型里面提取了所有可以赋给Union的类型 */




/* 手写 Omit */
type MyOmit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
}
/* 内置库的语法 */
type Omit2<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
/* Omit<Type, Keys>
从Type类型里面过滤了(删除)一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型) */




/* 手写 Record */
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
/* Record<Keys, Type>
构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型 */




/* 手写 NonNullable */
type MyNonNullable<T> = T extends null | undefined ? never : T
  /* NonNullable<Type>
构造一个类型，这个类型从Type中排除了所有的null、undefined的类型 */
