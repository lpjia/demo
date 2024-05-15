const fs = require('node:fs')

/* 获取文件夹下所有文件 */
const getFileList = (pathStr) => {
  const fileList = []
  readFile(pathStr, fileList)
  return fileList
}

/* 递归读取文件 */
const readFile = (pathStr, fileList) => {
  const files = fs.readdirSync(pathStr)
  files.forEach(walk)

  function walk(file) {
    const stats = fs.statSync(pathStr + '/' + file)
    if (stats.isDirectory()) {
      readFile(`${pathStr}/${file}`, fileList)
    }
    else {
      const obj = {
        size: stats.size,
        name: file,
        path: `${pathStr}/${file}`,
      }
      fileList.push(obj)
    }
  }
}

module.exports = {
  getFileList,
  readFile
}