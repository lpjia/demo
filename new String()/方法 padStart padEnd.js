/* str.padStart() 在开头填充
一参是 maxLength 字符串最大长度, 二参是用来填充的字符串(可选)
二参默认值是空字符串

str.padEnd() 在末尾填充

返回一个新字符串 */

const str = '123456'
console.log(
  str.padStart(10, 'a')
  , str.padEnd(10, 'a')
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  str.padStart(10)
  , str.padStart(10).length
  , str.padEnd(10)
  , str.padEnd(10).length
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  str.padStart(10, 'abc')
  , str.padEnd(10, 'abc')
)
console.log('---- 分割线 ----\n\n\n')


console.log(
  str.padStart(10, 'abcdefg') // 二参, 超出则截断末尾
  , str.padEnd(10, 'abcdefg')
)
console.log('---- 分割线 ----\n\n\n')





// 