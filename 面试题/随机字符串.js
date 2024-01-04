/* 随机字符 */

/* 产生类似uuid的随机字符串 */
function uuid() {
  let urlObj = URL.createObjectURL(new Blob())
  let randomStr = urlObj.slice(-36)
  // 手动释放内存
  URL.revokeObjectURL(urlObj)
  urlObj = null
  return randomStr
}


/* 26个字母+10个数字, 字符成员有36种 */
function randomString(len = 6) {
  if (len <= 11) {
    return Math.random()
      .toString(36) // 产生的字符串最多只有11位
      .substring(2)
      .substring(2, 2 + len)
      .padEnd(len, '0')
  }
  else {
    // 递归
    return randomString(11) + randomString(len - 11)
  }
}



let str = randomString(30)
console.log(
  uuid(),
  str,
  str.length,
)
