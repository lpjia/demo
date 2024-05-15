const fs = require('node:fs')
const path = require('node:path')


/* 流 一种数据结构
data事件可能会有多次，每次传递的chunk是流的一部分数据
要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束
所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable */
const rs = fs.createReadStream(path.resolve(__dirname, './output/liu_wen_jian.txt'), 'utf-8')
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



/* 以流的形式写入文件 */
const ws = fs.createWriteStream(path.resolve(__dirname, './output/wen_ben.txt'), 'utf-8')
ws.write('使用 Stream 写入文本数据...\n')
ws.write('END')
ws.end()

const ws2 = fs.createWriteStream(path.resolve(__dirname, './output/er_jin_zhi.txt'), 'utf-8')
ws2.write(Buffer.from('使用 Stream 写入二进制数据...\n', 'utf-8'))
ws2.write('END', 'utf-8')
ws2.end()



/* pipe 管道 管线
像可以把两个水管串成一个更长的水管一样，两个流也可以串起来
一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe
默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流 */
function filePipe() {
  const reader = fs.createReadStream(path.resolve(__dirname, './output/test.txt'), 'utf-8')
  const writer = fs.createWriteStream(path.resolve(__dirname, './output/ws.txt'), 'utf-8')
  writer.write('使用 pipe...\n') // 先写入
  reader.pipe(writer) // 再pipe
}
setTimeout(filePipe, 20);