

/**
 * 查找元素
 */
let str = 'hello'
str.at()






/**
 * 查找索引
 */





/**
 * 用 apply 把数组转为多个参的形式
 */
let c = 'hello '
  , c2 = 'world'
  , c3 = []
for (let item of c.concat(c2)) {
  c3.push(item.charCodeAt())
}
console.log('c3: ', c3)

let c4 = String.fromCharCode.apply(null, c3)
console.log('c4: ', c4)
console.log('typeof c4: ', typeof c4)
console.log('---- 分割线 ----\n\n\n')





/**
 * fromCharCode()
 * 将 Unicode 编码转为字符。
 */
let b = String.fromCharCode(72, 69, 76, 76, 79)
console.log('b: ', b)
console.log('typeof b: ', typeof b)
console.log('---- 分割线 ----\n\n\n')




/**
 * charCodeAt()
 * 返回在指定的位置的字符的 Unicode 编码。
 */
let a = 'A'.charCodeAt()
  , a2 = 'Z'.charCodeAt()
  , a3 = 'a'.charCodeAt()
  , a4 = 'z'.charCodeAt()
  , a5 = '0'.charCodeAt()
  , a6 = '9'.charCodeAt()
console.log('a: ', a)
console.log('typeof a: ', typeof a)
console.log('a2: ', a2)
console.log('a3: ', a3)
console.log('a4: ', a4)
console.log('a5: ', a5)
console.log('a6: ', a6)
console.log('---- 分割线 ----\n\n\n')