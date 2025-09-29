// substring 子字符串, 字面意思是截取出一个子字符串

/* str.substring()
一参是 startIndex, 二参是 endIndex(可选)
substring(startIndex, endIndex), 切片范围类似随机数 0-1, 但取不到1
任何< 0 或> str.length 的参数值分别被视为 0 和 str.length
NaN 的数值均被视为 0

返回一个新字符串 */

/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring */



// 字符串有固定长度
const str = '5001班'
console.log(
  // 从后面取后几个字符, -几就取几个
  str.substring(str.length - 1) // 班
)
console.log('---- 分割线 ----\n\n\n')

// 巧计, 有0就保留前面字符, 没0就保留后面字符

console.log(
  // 除去后面几个, -几就去掉几个, 取剩下的前面字符
  str.substring(0, str.length - 1) // 5001
)
console.log('---- 分割线 ----\n\n\n')



/* 从最前面取几个字符 substring(0, 几)
从第几个开始取 substring(0, 几 - 1)


常用的处理有 日期 时间
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
console.log('---- 分割线 ----\n\n\n')



// 字符串没有固定长度, 比如取文件名(不带后缀)
// 找准某个截取点的索引
const fileName = 'sjghkhakg.xml'
const fileName2 = 'ProductTable.module.scss'
console.log(
  // 取文件名
  fileName.substring(0, fileName.lastIndexOf('.')), // sjghkhakg
  fileName2.substring(0, fileName2.lastIndexOf('.')), // ProductTable.module
)
console.log(
  // 取扩展名, 带.点
  fileName.substring(fileName.lastIndexOf('.')), // .xml
  fileName2.substring(fileName2.lastIndexOf('.')), // .scss

  // 不带.点
  fileName.substring(fileName.lastIndexOf('.') + 1), // xml
  fileName2.substring(fileName2.lastIndexOf('.') + 1), // scss
)