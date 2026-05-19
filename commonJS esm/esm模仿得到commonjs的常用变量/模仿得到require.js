import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

/* 为啥不用esm的动态导入?
import('./dong_tai.js').then(console.log)
因为是异步的 */

/* commonjs的require是同步函数, 同步导入执行
也会缓存已require的模块 */

const masterVersion = require('../package.json').version
console.log('masterVersion:', masterVersion)