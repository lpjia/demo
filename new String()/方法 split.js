// 分割字符串, 变为数组

/* str.split()
一参是以什么标识来分割(可选), 二参是限制分割多少段(可选)
返回新字符串数组 */

/* 字符串中以分隔符(得删掉)分, 返回分的多个片段组成数组  */

// 以-分, 分完删了-
const str2 = '上海-北京-郑州-广州-深圳-新乡'
const arrStr2 = str2.split('-')
console.log(
  arrStr2,
  arrStr2.length,
  str2.replaceAll('-', ',')
)


// 一参传空字符串, 切分每个字符
const str5 = '切分每个字符'
console.log(
  str5.split('')
)



// 一参不传则直接把字符串转为字符串数组, 长度为1
const str = '一个字符串'
const arrStr = str.split()
console.log(
  arrStr,
  arrStr.length
)


// 空字符串split
// 传''参
const str3 = ''
const arrStr3 = str3.split('') // 返回 []
console.log(
  arrStr3,
  arrStr3.length // 0
)
// 不传参
const arrStr4 = str3.split() // 返回 ['']
console.log(
  arrStr4,
  arrStr4.length // 1
)
