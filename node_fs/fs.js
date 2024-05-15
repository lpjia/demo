// 一般用到fs模块少不了path模块
const fs = require('node:fs')
const path = require('node:path')
// const { getFileList, readFile } = require('./utils')


/* 返回 解析为绝对路径 */
const targetPath = path.resolve(__dirname, './one')
// d:\demo\node_fs_new\one


/* 返回 读取目录的内容, 包括文件和文件夹
文件一般都带有后缀, 不能靠后缀来区分文件和文件夹 */
const files = fs.readdirSync(targetPath)
// [ 'no_suffix_file', 'oneFile.ts', 'two' ]
// 回调用法 fs.readdir(路径, (err, data) => {}) // 不报错则err为null


files.forEach((file) => {
  /* 获取文件信息 */
  const stats = fs.statSync(targetPath + '/' + file)
  // console.log(stats)
  // console.log(targetPath + '/' + file) // d:\demo\node_fs_new\one/oneFile.js


  /* 是不是文件夹 */
  if (stats.isDirectory()) {
    // console.log('文件夹: ', file)
    // 一般会递归继续找
  }


  /* 是不是文件 */
  if (stats.isFile()) {
    // console.log('文件: ', file)
  }

})


/* 读取文件 */
const file = fs.readFileSync(path.resolve(__dirname, 'globalVar.js'), 'utf-8')
// 回调用法 -> fs.readFile(路径, 'utf-8', (err, data) => {}) // 不报错则err为null
// 关于文件内容的, 需要手动加'utf-8'


/* 写入文件 */
fs.writeFileSync(`${__dirname}/output/test.txt`, file)
// 回调用法 -> fs.writeFile(文件名, 数据, 'utf-8', (err) => {}) // 不报错则err为null



/* 路径是不是存在 */
const pathExist = fs.existsSync('./output')
// const pathExist = fs.existsSync(__dirname)
// const pathExist = fs.existsSync(__filename)
// console.log(pathExist)


/* 链式调用 */
const files2 = fs.readdirSync(__dirname).filter((file) => file.includes('node'))



/* 删除空目录 */
// fs.rmdirSync('./kong3')


/* 创建目录 */
// fs.mkdirSync('kong4')


/* 删除文件或符号链接(软链接) */
// fs.unlinkSync('./kong')


/* 拷贝文件 */
// fs.copyFileSync('globalVar.js', 'globalVar2.js')



/* 重命名 */
const oldPath = path.resolve(__dirname, 'output', 'ws.txt')
const newPath = path.resolve(__dirname, 'output', 'ws_new.txt')
fs.renameSync(oldPath, newPath)
// 回调用法 -> fs.rename(oldPath, newPath, (err) => {}) // 不报错则err为null




/* 获取某路径的文件对象信息 */
const stat = fs.statSync(path.resolve(__dirname, 'globalVar.js'))
// 回调用法 -> fs.stat(路径, (err, stat) => {}) // 不报错则err为null
stat.isFile() // 是不是文件
stat.isDirectory() // 是不是目录
stat.size // 文件大小
stat.birthtime // 创建时间
stat.mtime // 修改时间