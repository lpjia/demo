export { }

/* never类型 */
type Method = 'GET' | 'POST' // 当改动了这个类型时, 想要知道影响了哪些代码, 去做相应的修改
// type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' // 扩展了这个类型, exhaustiveCheck就会提示报错

// method没有给string类型, 是想用Method来类型收缩
function request(method: Method, url: string) {
  switch (method) {
    // 分支收缩了
    case 'GET':
      return 'abc';
    case 'POST':
      return 'def'
    // 自己知道永远也进不了default分支
    default:
      // method // 这里default是匹配不到'GET' | 'POST'的, 所以是never类型

      // never类型可以赋值给never类型, 其他类型不能赋值给never类型, never类型可以赋值给任何类型
      const exhaustiveCheck: never = method
      return exhaustiveCheck
  }
}


/* never类型 */
// x可以是任何类型, 但不能是日期

// 这个函数封装的, 在运行时报错, 一点都不ts
function log(x: any) {
  if (x instanceof Date) {
    throw new Error('参数不能是日期')
  }
  console.log(x)
}
// log(new Date()) // 编译时不报错

// 利用类型收缩和never类型
function log2<T>(x: T extends Date ? never : T) {
  console.log(x)
}
// log2(new Date()) // 编译时报错

// 用类型别名提取出一个类型
type BanDate<T> = T extends Date ? never : T
function log3<T>(x: BanDate<T>) {
  console.log(x)
}
// log3(new Date()) // 编译时报错

// 再封装一个更通用的类型, 去除掉任何一种类型
type BanType<T, U> = T extends U ? never : T
function log4<T>(x: BanType<T, Date>) {
  console.log(x)
}
// log4(new Date()) // 编译时报错