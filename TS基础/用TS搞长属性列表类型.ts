export { }

/* 搞定一个这样类型
type LeiXing = {
  p1:
  p2:
  p3:
  ...
  p95:
  p96:
} */


/* 一开始想的是用动态生成的元组类型再转联合类型, 结果TS不支持动态生成元组类型
如果写成静态的, 元组类型得写全(有点傻, 不好搞) */
// const arr: string[] = []
// for (let index = 1; index < 97; index++) {
//   arr.push(`p${index}`)
// }
// /* arr = ['p1', 'p2',..., 'p96'] */
// const arrConst = arr as const // 在 TypeScript 中，as const 只能用于字面量或编译时可确定的静态值，无法直接用于动态生成的数组


// const arr2 = {} as readonly `p${number}`[]; // readonly `p${number}`[]
// type Arr = typeof arr2[number] // `p${number}`
// type Arr2 = typeof arr2['length'] // number



// /* 类似这样的实现, 不想手动写96个 */
// type Props = ['p1', 'p2', 'p9']
// type Fields = Props[number] // "p1" | "p2" | "p9"
// /* type Len = Props['length'] // 3 */
// type GenerateObject = {
//   [K in Fields]: string
// }


// /* type Props = ['p1', 'p2', 'p9'] */
// type Fields<Props extends string[] = ['p1', 'p2', 'p9']> = Props[number] // 把Props作为泛型参数, 还给了默认值
// type GenerateObject = {
//   [K in Fields]: string
// }



// /* 96是数字字面量类型 */
// type Num<T> = T extends 96 ? 'T' : 'F'
// type Result = Num<96> // 只有传96, 才返回'T'

// /* Props用默认值来进行三目运算, Props长度只要不够, 就递归 解构 组装新的Props
// Props以默认值开始, 长度是0, 所以第一项是'p0'  */
// type Fields<Props extends string[] = []> =
//   Props['length'] extends 96 ?
//   Props[number] :
//   Fields<[...Props, `p${Props['length']}`]> // 递归
// type GenerateObject = {
//   [K in Fields]: string // Fields没有传泛型参数, 所以Props用默认值
// }



/* 加个泛型参数Count, 封装的更灵活 */
type Fields<Count, Props extends string[] = []> =
  Props['length'] extends Count ?
  Props[number] :
  Fields<Count, [...Props, `p${Props['length']}`]> // 递归

/* 因为有第一项'p0', 所以要排除掉
加个泛型参数Count, 封装的更灵活 */
type GenerateObject<Count> = Omit<{
  [K in Fields<Count>]: string
}, 'p0'>
type P = GenerateObject<97>
type PP = ShowMe<P & { aaa: number }> // 交叉类型, 增加key
