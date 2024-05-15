const fs = require('node:fs')
const path = require('node:path')


/* path.resolve 解析为绝对路径 */
console.log(
  path.resolve(__dirname, 'abc', '../aaa/xyz.png')
)


/* path.join 组装路径, 不一定返回绝对路径 */
console.log(
  path.join('..', 'model/**/*.ts')
)
console.log(
  path.join(__dirname, '..', 'model/**/*.ts')
)


/* path.extname 返回扩展名(后缀名, 带.), ext是扩展名的意思 */
console.log(
  path.extname('index.d.ts')
)



/* path.parse 把路径解析为一个obj */
console.log(
  path.parse('/a/b/c/abc.txt')
  // { root: '/', dir: '/a/b/c', base: 'abc.txt', ext: '.txt', name: 'abc' }
)