/* replace没有一个异步函数来处理异步的情况
封装 asyncReplaceAll 函数 */

function getName(str) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`name${str}`)
    }, 0);
  })
}
const template = `15,1,2-3_12--13------5`;

/* 封装通用函数, 首先判断边界情况
参数一限定2种情况, 字符串和正则, 使用"参数归一化", 是字符串的话就转为正则 */
String.prototype.asyncReplaceAll = async function (pattern, replacer) {
  if (typeof pattern === 'string') {
    pattern = new RegExp(pattern, 'g')
  }
  else if (pattern instanceof RegExp) {
    if (!pattern.global) { // replaceAll的要求, 带有全局标志
      throw new TypeError('The pattern RegExp should have the global flag set')
    }
    pattern = new RegExp(pattern) // 复制一份, 防止对外面造成影响
  }
  else {
    throw new TypeError('The pattern should be a string or a RegExp')
  }
  // 到这 pattern 一定是一个全局匹配的正则表达式, 守卫代码的作用

  if (typeof replacer === 'string') {
    return this.replaceAll(pattern, replacer) // 调用官方的方法
  }
  else if (typeof replacer !== 'function') {
    throw new TypeError('The second argument should be an async function or a string')
  }
  // 到这 replacer 一定是一个函数

  const matchs = this.match(pattern)
  const values = await Promise.all(matchs.map(replacer))
  return this.replace(pattern, () => values.shift())
};


(async () => {
  result = await template.asyncReplaceAll(/\d+/g, getName)
  console.log('result:', result)
})()