// 导入 fs 模块
const fs = require('fs')


/**
 * 异步读取文件
 */
fs.readFile('wenbenwenjian.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('---- 分割线 ----\n')
  }
});


/**
 * 同步读取文件
 * 错误需要用 try catch 来捕获
 */
try {
  const wenben = fs.readFileSync('wenbenwenjian.txt', 'utf-8')
  console.log('同步读取 wenben: ', wenben)
  console.log('---- 分割线 ----\n')
} catch (error) {
  console.log('error: ', error)
}


/**
 * 异步写入文件
 */
const outputTxt = 'Hello, Node.js'
fs.writeFile('output.txt', outputTxt, function (err) {
  if (err) console.log(err)
  else console.log('异步写入 ok')
  console.log('---- 分割线 ----\n')
})


/**
 * 同步写入文件
 * 错误需要用 try catch 来捕获
 */
try {
  const outputTxt2 = 'Hello, Node.js, this is 2'
  fs.writeFileSync('output2.txt', outputTxt2)
  console.log('同步写入 ok')
  console.log('---- 分割线 ----\n')
} catch (error) {
  console.log('error: ', error)
}


/**
 * 异步获取文件信息
 */
fs.stat('wenbenwenjian.txt', function (err, stat) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件:
    console.log('isFile: ' + stat.isFile());
    // 是否是目录:
    console.log('isDirectory: ' + stat.isDirectory());
    if (stat.isFile()) {
      // 文件大小:
      console.log('size: ' + stat.size);
      // 创建时间, Date对象:
      console.log('birth time: ' + stat.birthtime);
      // 修改时间, Date对象:
      console.log('modified time: ' + stat.mtime);
    }
    console.log('---- 分割线 ----\n')
  }
});


/**
 * 同步获取文件信息
 */
try {
  const stat = fs.statSync('output2.txt')
  console.log('为了区分, 以下是同步获取文件信息')
  // 是否是文件:
  console.log('isFile: ' + stat.isFile());
  // 是否是目录:
  console.log('isDirectory: ' + stat.isDirectory());
  if (stat.isFile()) {
    // 文件大小:
    console.log('size: ' + stat.size);
    // 创建时间, Date对象:
    console.log('birth time: ' + stat.birthtime);
    // 修改时间, Date对象:
    console.log('modified time: ' + stat.mtime);
  }
  console.log('---- 分割线 ----\n')
} catch (error) {
  console.log('error: ', error)
}


/**
 * 流 数据结构
 * data事件可能会有多次，每次传递的chunk是流的一部分数据
 * 要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束
 * 所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable
 */
const rs = fs.createReadStream('liuwenjian.txt', 'utf-8')
rs.on('data', function (chunk) {
  // data事件表示流的数据已经可以读取了
  console.log('DATA:')
  console.log('chunk: ', chunk)
  console.log('---- 分割线 ----\n')
})
rs.on('end', function () {
  // end事件表示这个流已经到末尾了，没有数据可以读取了
  console.log('END')
  console.log('---- 分割线 ----\n')
})
rs.on('error', function (err) {
  // error事件表示出错了
  console.log('ERROR: ' + err)
})


/**
 * 以流的形式写入文件
 */
const ws = fs.createWriteStream('output3.txt', 'utf-8')
ws.write('使用 Stream 写入文本数据...\n')
ws.write('END')
ws.end()

const ws2 = fs.createWriteStream('output4.txt')
ws2.write(Buffer.from('使用 Stream 写入二进制数据...\n', 'utf-8'))
ws2.write('END', 'utf-8')
ws2.end()


/**
 * pipe 管道
 * 像可以把两个水管串成一个更长的水管一样，两个流也可以串起来
 * 一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe
 * 默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流
 */
function file_pipe() {
  const rs3 = fs.createReadStream('output4.txt')
  const ws3 = fs.createWriteStream('output5.txt')
  ws3.write('使用 pipe...\n')
  rs3.pipe(ws3)
}
setTimeout(file_pipe, 2000);