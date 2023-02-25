let strSource = '5001班'
// 给班级数字加()
let str = ''
  , className = strSource
if (className) {
  str = className.substring(0, className.length - 1)
  str = `(${str})${className.substring(className.length - 1)}`
}
console.log(str)