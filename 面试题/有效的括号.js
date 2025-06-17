
/* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。 */

function isValid(s) {
  const map = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'], // 多加了一对
  ])
  let stack = []

  // 判断字符串不为空
  if (!s.length) {
    return false
  }
  for (const char of s) {
    // 判断char在不在map里, 在就是左, 不在就是右
    if (map.get(char)) {
      stack.push(char)
      continue;
    }
    // 右的, 拿出来栈中的左找map的右, 看是否一致
    if (map.get(stack.pop()) !== char) {
      return false
    }
  }
  return !stack.length
}

console.log(isValid("()"))
console.log(isValid("()[]{}"))
console.log(isValid("(]"))
console.log(isValid("([])"))
console.log(isValid(""))
console.log(isValid(")("))
console.log(isValid("<>[]"))