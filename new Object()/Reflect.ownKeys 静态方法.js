/* Reflect.ownKeys(obj)
一次性获取所有自有属性（可枚举和不可枚举、字符串和符号）的唯一方法 */

/* 由于返回数组, 所以键有一个排序问题
1. 按数字递增顺序排列的非负整数索引（但为字符串）
2. 按属性创建顺序排列的其他字符串键
3. 按属性创建顺序排列的符号键。

和Object.keys(obj)排序差不多, 但获取属性的范围不同, Object.keys(obj)返回obj自身的可枚举字符串键属性名称的数组。 */


let obj3 = {
  aa: 11,
  bb: 22,
  [Symbol('dd')]: 44
}
Object.defineProperty(obj3, 'cc', {
  value: 33,
  enumerable: false // 可枚举的
})
console.log(
  Reflect.ownKeys(obj3) // ['aa', 'bb', 'cc', Symbol(dd)]
)