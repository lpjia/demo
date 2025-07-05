// 替换字符串

/* str.replace() str.replaceAll()
一参是正则或要匹配的字符串, 二参是要替换的字符串或函数
返回一个替换后的新字符串 */

/* replace默认只替换匹配上的第一个元素 */

const str = 'kfcjjjjjadfnvadk'
console.log(
  str.replace('j', 't') // 常见
)
console.log('---- 分割线 ----\n\n\n')


// 二参使用函数, 函数必须返回字符串来替换
const str2 = str.replace('j', (...args) => {
  console.log(args) // 以后用剩余参数好写, 无论多少个参数
  return 't'
})
console.log(str2)
console.log('---- 分割线 ----\n\n\n')



/* 全部替换 */
// 第一种
console.log(
  str.split('j'), // 巧记, 数组项之间的逗号替换了'j'
  str.split('j').join('t') // 巧记, 数组项之间的逗号替换成't'
)
console.log('---- 分割线 ----\n\n\n')


// 第二种
// 正则两种形式: /xxx/g 或 new RegExp('xxx', 'g')
// 正则, 但是对于特殊字符还要转义
// 当涉及到多于1个字符的字符串替换时, 还是难写
console.log(
  str.replace(/j/g, 't')
  , str.replace(new RegExp('j', 'g'), 't')
)
console.log('---- 分割线 ----\n\n\n')


// 第三种
// 新的自带方法 replaceAll
console.log(
  str.replaceAll('j', 't')
)
console.log('---- 分割线 ----\n\n\n')