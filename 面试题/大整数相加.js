/* a 和 b 都是超过js最大安全数的string类型的数字 */
function sum(a, b) {
  const len = Math.max(a.length, b.length)
  a = a.padStart(len, '0') // 用'0'补齐长度
  b = b.padStart(len, '0')
  let jin_wei = 0
  let result = ''
  for (let i = len - 1; i >= 0; i--) { // 从右到左循环
    const sum = +a[i] + +b[i] + jin_wei
    const c = sum % 10 // 加完某一位后, 得到的'个位数'
    jin_wei = sum >= 10 ? 1 : 0
    result = c + result
  }
  if (jin_wei) { // 最大位相加完之后还有进位
    result = jin_wei + result
  }
  return result
}


console.log(
  Number.MAX_SAFE_INTEGER,
  Number.MAX_SAFE_INTEGER + 10,
  sum('' + Number.MAX_SAFE_INTEGER, '' + Number.MAX_SAFE_INTEGER),
)