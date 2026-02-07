const fs = require('node:fs')
const path = require('node:path')

/* ESModule才有import.meta.url, CommonJS没有 */


/* import.meta.url: file:///d:/demo/OCR/main2.js
__filename: d:\demo\OCR\main2.js
__dirname: d:\demo\OCR */


/* 在CommonJS模块中，__dirname表示当前模块的目录路径(绝对路径)。
但是，在ES模块（.mjs文件或在package.json中设置"type": "module"的.js文件）中，模块作用域的处理方式不同，__dirname并不自动提供。 */


/* 在CommonJS模块中，__filename表示当前模块的文件路径(绝对路径)。 */


/* fileURLToPath(), 将文件URL转换为平台特定的文件路径形式(绝对路径) */


/* import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 以上3行代码可以在ESModule中得到CommonJS的全局变量 __dirname 和 __filename, 方便后续使用
const filePath = path.resolve(__dirname, 'ocr.png')
const file = fs.readFileSync(path.resolve(__dirname, 'ocr.png'))
*/


/* 不用考虑封装(封装等价于没封装)
import { resolve as pathResolve, dirname as pathDirname } from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);
*/


/* 常用
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'ocr.png')
const file = fs.readFileSync(filePath, 'utf-8')
*/


/* 直接使用
import { fileURLToPath, URL } from 'node:url'
fileURLToPath(new URL('index.js', import.meta.url)) // 得到index.js文件的绝对路径

const filePath = path.resolve(__dirname, 'ocr.png') // 得到ocr.png文件的绝对路径
--> const filePath = fileURLToPath(new URL('ocr.png', import.meta.url)) // 等价, 可以不需要path.resolve
// 但还是推荐使用path模块, 减少记忆分担(心智负担)
*/


/* 以下两个等价
fileURLToPath(import.meta.url)
fileURLToPath(new URL(import.meta.url))
*/