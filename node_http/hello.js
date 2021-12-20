// 导入http模块:
const http = require('http')

// 创建http server，并传入回调函数:
const server = http.createServer(function (request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(`${request.method}: ${request.url}`)
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  // 将HTTP响应的HTML内容写入response:
  response.end(`<html lang="zh">
                  <body>
                    <h3>Hello World!</h3>
                  </body>`)
})

// 让服务器监听8080端口:
server.listen(8110)
console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:8110`);