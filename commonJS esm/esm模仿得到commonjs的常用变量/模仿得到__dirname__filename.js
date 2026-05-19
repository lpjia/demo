// const fs = require('node:fs')
// const path = require('node:path')
// import fs from 'node:fs'
// import path from 'node:path'


/* ESModule才有import.meta.url, CommonJS没有 */


/* import.meta.url: file:///d:/demo/OCR/main2.js
__filename: d:\demo\OCR\main2.js
__dirname: d:\demo\OCR
返回的路径都不同 */


/* 在CommonJS模块中，__dirname表示当前模块的目录路径(绝对路径)。
但是，在ES模块（.mjs文件或在package.json中设置"type": "module"的.js文件）中，模块作用域的处理方式不同，__dirname并不自动提供。
现在也能直接拿到
node v22.16.0 生产正式支持
import.meta.dirname
import.meta.filename */


/* 在CommonJS模块中，__filename表示当前模块的文件路径(绝对路径)。 */


/* fileURLToPath(), 将文件URL转换为平台特定的文件路径形式(绝对路径) */


import { fileURLToPath } from 'node:url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
console.log('__dirname:', __dirname)
/* const __filename = fileURLToPath(import.meta.url);
__filename 很少用, __dirname 常用

// 以上3行代码可以在ESModule中得到CommonJS的全局变量 __dirname 和 __filename, 方便后续使用
const filePath = path.resolve(__dirname, 'ocr.png')
const file = fs.readFileSync(path.resolve(__dirname, 'ocr.png'))
*/



/* 以下两个等价
fileURLToPath(import.meta.url)
fileURLToPath(new URL(import.meta.url))
*/
