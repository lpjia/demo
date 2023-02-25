// substring 子字符串, 字面意思是截取出一个子字符串

/* str.substring()
一参是from, 二参是to(可选)
to 要想象索引0的位置就好记了
返回新字符串 */

/* 也就是需要取的字符索引, 开始索引(from), 结束索引+1(to)
或者直接数, 开始个数-1(from), 结束个数(to)
记的话推荐记个数(符合人的思维), 计算有时需要记索引 */

/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring */

// 字符串有固定长度
const str = '5001班'
const str2 = str.substring(str.length - 1)
// 从后面取后几个字符, -几就取几个
console.log(
  str2
)

const str3 = str.substring(0, str.length - 1)
// 除去后面几个, -几就去掉几个, 取剩下的前面字符
console.log(
  str3
)



// 字符串没有固定长度, 比如取文件名(不带后缀)
// 找准某个截取点的索引
const fileName = 'sjghkhakg.xml'
console.log(
  fileName.substring(0, fileName.lastIndexOf('.')),
  fileName.substring(0, fileName.indexOf('.')) // 这两个其实一样
)



/* 常用的处理有 日期 时间
对于YYYY-MM-DD hh:mm:ss这种时间格式,统一用这个
日期长度是10, 时间长度是8
str.substring(0, 10)
str.substring(11)
*/
const strTime = '2023-02-22 12:24:36'
console.log(
  strTime.substring(0, 10) // 日期
)
console.log(
  strTime.substring(11) // 时分秒
)