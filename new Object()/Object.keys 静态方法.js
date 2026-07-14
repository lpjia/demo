/* Object.keys(obj) 静态方法
返回obj自身的可枚举字符串键属性名称的数组。
可枚举、字符串键 */

/* 由于返回数组, 所以键有一个排序问题
如果是数字键(0和正整数), 先提前再按升序排, 字母键(和其他数)按添加顺序排(包括初始书写顺序和后续添加属性) */

/* Object.values(obj) 返回的数据项的顺序和keys方法一样 */


// 属性名的初始书写顺序
let o = {
  a: 'aaa',
  f: 'fff',
  g: 'ggg',
}
// 后续添加属性
o['e'] = 'eee'
o['c'] = 'ccc'
console.log(
  Object.keys(o), // ['a', 'f', 'g', 'e', 'c']
  Object.values(o) // [ 'aaa', 'fff', 'ggg', 'eee', 'ccc' ]
)


let o2 = {
  e: 'eee',
  h: 'hhh',
}
o2[-1] = '-1-1-1'
o2.m = 'mmm'
o2[1] = '111'
o2[0] = '000'
o2[-6.6] = '-6.6'
o2[1.3] = '1.3'
console.log(
  Object.keys(o2), // ['0', '1', 'e', 'h', '-1', 'm', '-6.6', '1.3']
  Object.values(o2) // ['000', '111', 'eee', 'hhh', '-1-1-1', 'mmm', '-6.6', '1.3']
)
console.log('---- 分割线 ----\n\n\n')


/* 和其他遍历或校验属性的方法比较 */


/* for-in, (有in就知道还得找原型链), 遍历自身和原型链上可枚举的string属性
for-in, 不会遍历Symbol属性 */
const symb = Symbol('一个key')
const o3 = {
  pgone: 'li_xiao_lu ex-boyfriend',
  __proto__: o,
  [symb]: symb
}
let o3Keys = []
for (const k in o3) {
  o3Keys.push(k)
}
console.log(o3Keys) // ['pgone', 'a', 'f', 'g', 'e', 'c']
/* 有需要用到for-in的, 推荐加判断Object.prototype.hasOwnProperty.call(obj, key)兼容性好
或者用Object.keys(obj).map(k => k)  */
let o3OwnKeys = []
for (const k in o3) {
  if (Object.prototype.hasOwnProperty.call(o3, k)) {
    o3OwnKeys.push(k)
  }
}
console.log(
  o3OwnKeys
  , Object.keys(o3).map(k => k)) // 处理数据在map里搞
console.log('---- 分割线 ----\n\n\n')



/* enumerable: false
变为不可枚举 */
const o4 = {
  __proto__: o3,
  o4name: 'ooooo4',
  [Symbol.iterator]() {
    return '忘了怎么搞了, 在这不重要了'
  },
}
Object.defineProperty(o4, 'wang_yi_cc', {
  value: 33,
  enumerable: false // 可枚举的
})
Object.defineProperty(o4, symb, {
  value: 'symbol',
  enumerable: false // 可枚举的
})


console.log(
  Object.keys(o4) // ['o4name']
  // keys方法说白了还是遍历, 不可枚举的属性, 说白了就不能遍历

  /* 获取所有字符串属性, 不管是否可枚举 */
  , Object.getOwnPropertyNames(o4)


  /* 获取所有symbol属性, 不管是否可枚举 */
  , Object.getOwnPropertySymbols(o4)
)





/* in 操作符, 如果指定属性位于指定对象或其原​​型链中， in 运算符返回 true 。 */
console.log(
  'pgone' in o3, // true
  'f' in o3, // true
  'toString' in o3, // true
  symb in o3 // true, in操作符是可以校验symbol属性
)
console.log('---- 分割线 ----\n\n\n')