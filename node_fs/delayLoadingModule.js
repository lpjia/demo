const path = require('node:path')

/* 在 Node.js 中，require.resolve 是一个用于查找并返回指定模块的绝对路径的函数，但它并不会实际加载该模块。这在你需要知道模块的路径但又不想立即加载它时非常有用。 */
const utilsPath = require.resolve('./utils.js') // 获取某模块的绝对路径
const utils = require(utilsPath) // 加载某模块
console.log(
  utils.getFileList(path.resolve(__dirname, 'output')) // 使用模块
)