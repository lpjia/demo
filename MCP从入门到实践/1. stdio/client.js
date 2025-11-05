import { spawn } from 'child_process';

/* 启动 server.js 子进程 */
const serverProcess = spawn('node', ['server.js'])

/* 监听服务端的响应 */
serverProcess.stdout.on('data', (data) => {
  console.log(data.toString())
})

/* 发送几条测试消息 */
const msgArr = ['生命有意义吗?', '宇宙有尽头吗?', '再见!']

msgArr.forEach((msg, i) => {
  setTimeout(() => {
    console.log(`----> ${msg}`)
    serverProcess.stdin.write(msg)
  }, i * 1000) // 每秒发一条
})