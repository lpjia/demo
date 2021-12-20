const fs = require('fs')
  , path = require('path')
  , http = require('http')


// 从命令行参数获取root目录，默认是当前目录:
const root = path.resolve(process.argv[2] || '.')
console.log('Static root dir: ', root) // C:\demo\node http


const server = http.createServer(function (request, response) {
  // 获得URL的path, 端口号后面的 && ?前面的
  const pathname = request.url
  // console.log('pathname: ', pathname)

  // 获得对应的本地文件路径
  const filePath = path.join(root, pathname)
  // console.log('filePath: ', filePath)
  // 获取文件状态:
  fs.stat(filePath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log(`200 ${request.url}`)
      console.log('---- 分割线 ----\n')
      // 发送200响应:
      response.writeHead(200)
      // 将文件流导向response:
      // 没有必要手动读取文件内容。
      // 由于response对象本身是一个Writable Stream，直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
      fs.createReadStream(filePath).pipe(response)
    } else {
      // 出错了或者文件不存在:
      console.log(`404 ${request.url}`)
      // 发送404响应:
      response.writeHead(404)
      response.end('404 Not Found')
    }
  })
})

server.listen(8111)
console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:8111`);