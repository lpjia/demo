export { }

/* 保证类型安全
非空断言, 表示它的值不可能是 null 或者 undefined
在任意表达式后加! */

function liveDangerously(x?: number | null) {
  console.log(x!.toFixed()); // 去掉!则报错
}






type U = {
  a: number;
  b: number;
} | {
  a: number;
  // a: string; // 尝试去掉注释
  c: number;
}

const u: U = {
  a: 1, // 坤粉和马粉(不是字段), 至少有一个
  b: 2,
  c: 3,
}

// u.b // 为什么报错?

/* 联合类型
取并集, 但不是字段的并集, 而是{}的并集
坤粉和马粉都会鬼畜, 所以"粉丝.鬼畜"是不报错的
也可以说是为了保证类型安全, 最稳妥的只有取u.a(相同的字段)不报错, 取u.b或u.c都会报错

坤粉 举左手
  鬼畜
  唱歌
  跳舞
  打篮球
马粉 举右手
  鬼畜
  五连鞭
  太极
  讲武德
 */


/* 交叉类型
取交集, 但不是字段的交集, 而是{}的交集 */

type I = {
  a: number;
  b: number;
} & {
  a: number;
  // a: string; // 尝试去掉注释
  c: number;
}

/* a b c字段都定义了才不报错 */
const i: I = {
  a: 11,
  b: 22,
  c: 33,
}


// 以后还是用中文举例好理解, 毕竟语言层面也支持
type 坤粉 = { // 坤粉的举左手
  鬼畜: any,
  唱歌: any,
  跳舞: any,
  打篮球: any,
}
type 马粉 = { // 马粉的举右手
  鬼畜: any,
  五连鞭: any,
  太极: any,
  讲武德: any,
}

type 联合 = 坤粉 | 马粉
// 联合是以坤粉{}和马粉{}为并集, 举起手就算, 不管左右手还是全举
const a: 联合 = {
  鬼畜: '',

  唱歌: '',
  跳舞: '',
  打篮球: '',

  五连鞭: '',
  太极: '',
  // 讲武德: '',
}
// a.鬼畜 // 随便挑出一个人, 让他展示, 最保险只能是都会的这一个
type 联合keyof = keyof 联合 // 只能是都会的这一个


type 交叉 = 坤粉 & 马粉
// 交叉是以坤粉{}和马粉{}为交集, 两只手同时举
const b: 交叉 = {
  鬼畜: '',

  五连鞭: '',
  太极: '',
  讲武德: '',

  唱歌: '',
  跳舞: '',
  打篮球: '',
}
// b.全都会 // 随便挑出一个人, 让他展示, 都会
type 交叉keyof = keyof 交叉 // 都会



/* 'a'是string的特殊情况, 'a'是string的子类型, 两个取交集就是子
string看作马粉, 'a'看作超级马粉, 取交集就是超级马粉 */
type Test1 = 'a' & string
// type Test1 = 'a' | string

/* 'a'和'b'作为类型来讲, 不可能同时是'a'同时又是'b', 所以交叉后是never类型
'a'看作超级马粉, 'b'看作超级坤粉, 取交集就是不存在 */
type Test2 = 'a' & 'b'

/* 取并集 */
type Test3 = 'a' | 'b' | 1

/* 联合类型和其他类型运算, 是分开运算的 */
type Test4 = 'a' | 'b' | 1 & string
/* 等价于
type Test4 = ('a' & string) | ('b' & string) | (1 & string)
= 'a' | 'b' | never
= 'a' | 'b' */

/* 可以用在类型约束, 比如 keyof T & string 就能去掉keyof T中的Symbol字段 */