// 云笔记上有截图, 同时对照着看方便理解

const str = '吉娃娃不是𠮷娃娃😂是不是眼花了'
// 想要取出   娃娃😂

// 常规思路肯定这样取
console.log(
  str.substring(6, 9)
  // 不满足预期结果, 有乱码
)
console.log(
  '𠮷'.length,
  '😂'.length, // 占两个码元
  '眼'.length // 普通字符占一个码元
)
console.log(
  '😂'[0], // 乱码
  '😂'[1], // 乱码
)

/* 字符编码问题
16位二进制是一个码元
现在字符变多, 允许32位二进制表示一个字符, 也就是二个码元
一个字符由一个还是两个码元表示, 需要判断
str.length, 取的是码元的个数
xxx[i], 下标也说的是码元的下标 */




// str.codePointAt(x) 得到码点的值, 返回一个数字(码点与数字一一对应, 无重复)
console.log(
  '😂'.codePointAt(0),
  '😂'.codePointAt(0) > 0xffff, // 占用两个码元
  '是'.codePointAt(0) > 0xffff, // 占用一个码元
)


// 方便看, 和str值一样
const str2 = '吉娃娃不是𠮷娃娃😂是不是眼花了'
// 传实参还是按码点来    娃娃😂   还是(6, 9)
// 码点其实是人能看到的
// 但实际上截取的时候是按码元来取的, 关键是码元指针的移动计算
String.prototype.substringByPoint = function (pointStart, pointEnd) {
  let result = '' // 截取的结果
  let pointIdx = 0 //  码点的指针
  let cellIdx = 0 //  码元的指针
  console.log('this:', this)

  // 双指针不断地向右移动来进行截取, 使用循环
  while (1) {
    // 什么时候结束循环?
    if (pointIdx >= pointEnd || cellIdx >= this.length) {
      break
    }

    // 向右移动指针之前要做的任务!!!
    // this指向要处理的字符串(这里是str2)
    // str.codePointAt(x) // 实参是按码元指针来计算的, 返回一个数字(码点与数字一一对应, 无重复)得到码点的值
    const pointNum = this.codePointAt(cellIdx)
    if (pointIdx >= pointStart) {
      // String.fromCodePoint(x) // 实参传码点的值(codePointAt方法得到的数字), 返回字符
      result += String.fromCodePoint(pointNum)
    }

    // 向右移动双指针
    pointIdx++
    // 向右一次移动, 占两个码元就移动两位, 占一个码元就移动一位
    cellIdx += pointNum > 0xffff ? 2 : 1
  }
  return result
}

console.log(
  str2.substringByPoint(6, 9)
)