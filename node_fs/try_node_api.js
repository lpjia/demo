const fs = require('node:fs')
const path = require('node:path')


// const file = fs.readdirSync(__dirname).filter((file) => file.includes('node'))


// path.resolve(__dirname, 'globalVar.js')


// fs.readdir(path.resolve(__dirname), 'utf-8', (err, data) => {
//   console.log('err:', err)
//   console.log('data:', data)
// })


// const oldPath = path.resolve(__dirname, 'output', 'ws_new.txt')
// const newPath = path.resolve(__dirname, 'output', 'ws.txt')
// // fs.renameSync(oldPath, newPath)


// fs.rename(oldPath, newPath, (err) => {
//   console.log('err:', err)
// })


// function filePipe() {
//   const reader = fs.createReadStream(path.resolve(__dirname, './output/test.txt'), 'utf-8')
//   const writer = fs.createWriteStream(path.resolve(__dirname, './output/ws.txt'), 'utf-8')
//   writer.write('使用 pipe...\n') // 先写入
//   reader.pipe(writer) // 再pipe
// }
// setTimeout(filePipe, 20);


// const stat = fs.statSync(path.resolve(__dirname, 'globalVar.js'))


// fs.stat(path.resolve(__dirname, 'globalVar.js'), (err, stat) => {
//   console.log('err:', err)
//   console.log('stat:', stat)
// })


// fs.writeFile(path.resolve(__dirname, 'output', 'globalVar.js'), (err, stat) => {
//   console.log('err:', err)
//   console.log('stat:', stat)
// })


console.log(
  // file
  // stat,
  // stat.isFile() // 是不是文件
  // stat.isDirectory(), // 是不是目录
  // stat.size, // 文件大小
  // stat.birthtime, // 创建时间
  // stat.mtime, // 修改时间
)