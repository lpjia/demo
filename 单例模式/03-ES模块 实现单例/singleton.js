// 这个不能实现单例, 但是可以作为闭包写法参考
export function createFakeSingleton(className) {
  if (new.target) {
    throw new Error('只能使用普通函数的方式来调用')
  }
  let ins = null
  return (...args) => {
    if (!ins) {
      ins = new className(...args)
    }
    return ins
  }
}


// 利用ES模块只会运行一次, 后面再拿缓存, 实现单例
let singleton = null
export function createSingleton(className) {
  if (new.target) {
    throw new Error('只能使用普通函数的方式来调用')
  }
  return (...args) => {
    if (!singleton) {
      singleton = new className(...args)
    }
    return singleton
  }
}
export { singleton }