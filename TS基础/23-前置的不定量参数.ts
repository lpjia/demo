export { }

/* 对addImpl函数进行类型标注
前面的是不定量的参数, 但都是string类型, 得是'类型'字符串, 不能是随便一个字符串
最后一个参数是函数, 该函数的参数的数量和类型和前面参数保持一致 */


/* 报错, 剩余参数必须作为最后的参数 */
// declare function addImpl(...args: string[], fn:Function):void

/* 还要用剩余参数, 看作一个整体, 作为最后的参数
在 TypeScript 中，剩余参数的类型会被隐式设置为 any[] 而不是 any，如果你要设置具体的类型，必须是 Array<T> 或者 T[]的形式，再或者就是元组类型 */

/* 元组, 参数个数不匹配, 只定义了一个参 */
// declare function addImpl(...args: [string]): void

/* 最后一个函数参数类型“(a: any, b: any, c: any) => void”的参数不能赋给类型“string”的参数 */
// declare function addImpl(...args: string[]): void

/* ...string[]解构Array<string>类型, 最后一个函数参数类型还是不匹配 */
// declare function addImpl(...args: [...string[]]): void

/* ...string[]解构后, 加Function, 整个变为元组了 */
// declare function addImpl(...args: [...string[], Function]): void

/* 限制前面的不定量的参数的类型, JSTypeName是一个字符串的联合类型 */
// type JSTypeName = 'string' | 'number' | 'boolean' | 'object' | 'function' | 'symbol' | 'undefined' | 'bigint'
type JSTypeName = keyof JSTypeMap // 简化
type JSTypeNameShow = ShowMe<keyof JSTypeMap>
// declare function addImpl(...args: [...JSTypeName[], Function]): void // 一整行看不直观

/* 最后一个函数参数类型, 该函数的参数的数量和类型和前面参数保持一致 */
// declare function addImpl(
//   ...args: [
//     ...JSTypeName[],
//     (...args: any[]) => any
//   ]
// ): void

/* 需要一个映射, 把字符串类型映射为对应内容的类型
'string' -> string
'number' -> number */
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

/* 最后一个函数参数类型, 该函数的参数的数量和类型和前面参数保持一致 */
// declare function addImpl<T extends JSTypeName[]>(
//   ...args: [
//     ...T,
//     (...args: any[]) => any
//   ]
// ): void

/* 前面的不定参是一个数组, 最后一个函数的参数也是一个数组
输入是一个有3个参的数组, 输出也对应了3个参, 也是数组 */
type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]] // 遍历数组, 得到下标I, I是number类型
}
type TryTp = ArgsType<JSTypeName[]>

/* 完美!!!
在参数列表里使用元组 */
declare function addImpl<T extends JSTypeName[]>(
  ...args: [
    ...T,
    (...args: ArgsType<T>) => any
  ]
): void


/* 参数(a b c)的数量和前面的保持一致, 类型也要保持一致 */
addImpl('string', 'boolean', 'number', (a, b, c) => { })



/* 后置的不定量参数, 类型标注好写
先不考虑一参的函数内的参类型 */
// declare function tryFn(fn: Function, ...args: string[]): void
// tryFn((a, b, c) => { }, 'string', 'boolean', 'number')