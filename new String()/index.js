/**
 * 以后说明尽量用多行注释
 * 可以详细写
 * 暂时每一块内容的变量命名用 英文字母+数字
 */











/**
 * 截取字符串
 * substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集
 */
let e = "Mozilla"
  , leng = e.length
  // 给个参数0, 等于浅拷贝
  , e2 = e.substring(0)
  // 获取倒数3个字符, 要几个就用长度减几个
  , e3 = e.substring(leng - 3)
  // 需要取的, 字符索引, 开始索引(一参), 结束索引+1(二参)
  , e4 = e.substring(4, 5 + 1)
  // 需要取的, 直接数, 开始个数-1(一参), 结束个数(二参)
  , e5 = e.substring(3 - 1, 4)

console.log('e2:', e2)
console.log('e3:', e3)
console.log('e4:', e4)
console.log('e5:', e5)
console.log('---- 分割线 ----\n\n\n')




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