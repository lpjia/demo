/* 随机颜色 */

// 中规中矩
function randomColor() {
  let r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256)

  return `rgb(${r},${g},${b})` // rgb(x, x, x)
}



// 剑走偏锋
function randomColor2() {
  // Number.prototype.toString()可以把数字转为字符串, 参是x进制
  let str = Math.random().toString(16).substring(2, 8) // 有可能位数不够
  // 学会使用 while 循环, 很方便
  while (str.length < 6) {
    str += '0'
  }

  return '#' + str
}


console.log(
  randomColor(),
  randomColor2()
)