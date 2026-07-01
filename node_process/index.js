// // nodejs进程对象
// console.log(process)




// /* 获取命令行参数, 返回一个数组, 可以遍历
// 索引0是 node.exe 的文件路径
// 索引1正在执行 node 命令的 JavaScript 文件的路径
// 之后的每个元素依次为传递的命令行参数(从索引2开始是命令行参数) */
// console.log(
//   process.argv,
//   process.argv[2]
// )
// // node index.js -a -b -c




// /* 返回启动目录的绝对路径
// 返回当前工作目录, 是启动 Node.js 程序时所在的文件夹路径
// 比如在 d:\demo 目录执行 node xxx.js
// cwd() 返回 'D:\demo'  */
// console.log(process.cwd())
// // cpu架构
// console.log(process.arch)
// // Node.js 版本
// console.log(process.version)
// // 当前操作系统的名称
// console.log(process.platform)




// console.log(process.env)
console.log(process.env.NODE_ENV) // undefined
console.log(process.env.VITE_API_BASE_URL) // undefined
console.log(process.env.VUE_APP_BASE_API) // undefined
/* 安装 dotenv 读取 .env 文件, 把环境变量注入到 process.env */




// // process.nextTick()将在下一轮事件循环中调用, 下一轮事件循环中立即调用
// process.nextTick(() => {
//   console.log('nextTick callback!');
// });
// console.log('nextTick was set!');




// setTimeout(() => {
//   console.log('延迟3s打印')
// }, 3000)
// // Node.js 进程即将退出时的回调函数:
// process.on('exit', function (code) {
//   console.log('about to exit with code: ' + code);
// });