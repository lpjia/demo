/* 双指针 */
function is_hui_wen(str) {
  let left = 0
    , right = str.length - 1
  while (left < right) {
    if (str[left] === str[right]) {
      left++
      right--
      continue;
    }
    return false
  }
  return true
}
is_hui_wen('1565487649467845651')





/* 颠倒比对 */
function is_hui_wen2(str) {
  return str === str.split('').reverse().join('')
}
is_hui_wen2('1565487649467845651')