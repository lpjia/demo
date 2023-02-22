// 替换字符串

/* str.replace() str.replaceAll()
一参是正则或要匹配的字符串, 二参是要替换的字符串
返回替换后的新字符串 */

/* replace默认只替换匹配的第一个元素 */

const str = 'kjjadfnvadk'
const strReplace = str.replace('j', 't')
console.log(
  strReplace
)
console.log('---- 分割线 ----\n')


// 全部替换
// 第一种
const strReplace2 = str.split('j').join('t')
console.log(
  strReplace2
)

// 第二种
// 正则两种形式: /xxx/g 或 new RegExp('xxx', 'g')
// 正则, 但是对于特殊字符还要转义
// 当涉及到长度大于1的字符串替换时, 还是难写
const strReplace3 = str.replace(/j/g, 't')
const strReplace4 = str.replace(new RegExp('j', 'g'), 't')
console.log(
  strReplace3,
  strReplace4
)

// 第三种
// 新的自带方法 replaceAll
const strReplace5 = str.replaceAll('j', 't')
console.log(
  strReplace5
)