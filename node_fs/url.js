const fs = require('node:fs')
const path = require('node:path')

/* ESModule才有import.meta.url, CommonJS没有 */

/* 在CommonJS模块中，__dirname表示当前模块的目录路径。
但是，在ES模块（.mjs文件或在package.json中设置"type": "module"的.js文件）中，模块作用域的处理方式不同，__dirname并不自动提供。 */

/* fileURLToPath方法, 将文件URL转换为平台特定的文件路径形式 */

/* import.meta.url: file:///d:/demo/OCR/main2.js
__filename: d:\demo\OCR\main2.js
__dirname: d:\demo\OCR */

/* import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 以上3行代码可以在ESModule模拟 __dirname 变量, 方便后续使用
const file = fs.readFileSync(path.resolve(__dirname, 'ocr.png')) */