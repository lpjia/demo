// 和console.log('Hello world') 效果一样, 是其在node环境的实现
// process.stdout.write('Hello world\n')


/* 终端进程和node进程之间进行了通信
  终端进程(父进程)创建了子进程(node进程), 并且监听子进程
  子进程把它的pid, 发送数据给了父进程(终端进程), 终端进程显示了出来
占位 */
// process.stdout.write(process.pid + '\n')


/* 也可以监听父进程(终端进程)
  终端会自动把手动输入的内容通过'标准输入接口'发送给子进程
占位 */
// process.stdin.on('data', (data) => {
//   const resp = `回复: ${data}\n`
//   process.stdout.write(resp)
// })


process.stdin.setEncoding('utf-8') // 直接设置字符编码为utf-8
process.stdin.on('data', (data) => {
  // data是Buffer类型, 得转成string类型
  data = data
    .replace(/[?？]/g, '')
    .replace(/我/g, '你')
    .replace(/你/g, '我')
    .replace(/吗/g, '')
  const resp = `AI: ${data}\n`
  process.stdout.write(resp)
})