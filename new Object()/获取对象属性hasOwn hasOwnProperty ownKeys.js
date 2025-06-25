/* has 有没有 */


/* in 能不用就不用
Object.prototype.hasOwnProperty.call(obj, key) 兼容性好
Object.hasOwn(obj, key) 推荐用, 只找自身属性 */


/* obj.hasOwnProperty(key) 有可能 obj 自身有 hasOwnProperty 方法, 返回不正确的结果
Object.prototype.hasOwnProperty.call(obj, key) 替代上面用法, 更保险
Object.hasOwn() 高版本, 不存在上面两种情况可能出现的问题 */





/* obj.hasOwnProperty(key)
Object.prototype.hasOwnProperty(key) */

console.log(
  o3.hasOwnProperty('f') // false
  , Object.prototype.hasOwnProperty.call(o3, 'f') // false
)


// 重写方法, 覆盖父类上的同名方法, 不够安全
o3.hasOwnProperty = function (prop) {
  return prop in this
}


console.log(
  o3.hasOwnProperty('f') // true
  , Object.prototype.hasOwnProperty.call(o3, 'f') // false
)
console.log('---- 分割线 ----\n\n\n')



/* Object.hasOwn(obj, key), 跟遍历(可枚举)那些没有关系 */
console.log(
  Object.hasOwn(o3, symb)
  , Object.hasOwn(o3, 'pgone')
  , Object.hasOwn(o3, 'a')
)