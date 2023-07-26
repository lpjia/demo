// 一般用到fs模块少不了path模块
const fs = require('fs')
const path = require('path')
// const { getFileList, readFile } = require('./utils')


/* 返回 解析为绝对路径 */
const targetPath = path.resolve(__dirname, './one')
// console.log(targetPath) // d:\demo\node_fs_new\one


/* 返回 读取目录的内容, 包括文件和文件夹
文件一般都带有后缀, 不能靠后缀来区分文件和文件夹 */
const files = fs.readdirSync(targetPath)
// console.log(files) // [ 'no_suffix_file', 'oneFile.ts', 'two' ]


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
const file = fs.readFileSync('./globalVar.js', 'utf-8')
// console.log(file)


/* 写入文件 */
fs.writeFileSync(`${__dirname}/output/test.txt`, file)


/* 路径是不是存在 */
const pathExist = fs.existsSync('./output')
// const pathExist = fs.existsSync(__dirname)
// const pathExist = fs.existsSync(__filename)
// console.log(pathExist)


/* 链式调用 */
const files2 = fs.readdirSync(__dirname).filter((file) => file.includes('node'))
// console.log(files2)


/* 删除空目录 */
// fs.rmdirSync('./kong3')


/* 创建目录 */
// fs.mkdirSync('kong4')


/* 删除文件或符号链接(软链接) */
// fs.unlinkSync('./kong')


/* 拷贝文件 */
// fs.copyFileSync('globalVar.js', 'globalVar2.js')



console.log(

)