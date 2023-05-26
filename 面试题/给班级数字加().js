let className = '5001班'
// 给班级数字加()
let str = ''
if (className) {
  const leng = className.length
  str = className.substring(0, leng - 1)
  str = `(${str})${className.substring(leng - 1)}`
}
console.log(str, className)