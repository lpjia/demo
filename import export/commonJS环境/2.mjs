export let count = 1
export function increase() {
  count++
}


export const count2 = 10 // 推荐
export function increase2() {
  count2++
}


export const o = {
  count3: 20
}
export const increase3 = () => { // 推荐
  o.count3++
}


/* 解决ESM中的符号绑定
导出时全部用const, 包括函数 */