// 判断JavaScript执行环境
if (typeof (window) === 'undefined') {
  console.log('node.js');
} else {
  console.log('browser');
}



// nodejs全局对象
console.log('global: ', global)
// 为了和浏览器保持统一的全局变量, 增添加了globalThis
console.log(globalThis === global)
// 当前文件所在的目录路径(是绝对路径)
console.log(__dirname)
// 当前文件的路径(是绝对路径), 包含后缀名
console.log(__filename)
// nodejs进程
console.log(process)



/* 获取命令行参数, 返回一个数组, 可以遍历
索引0是 Node.js 的执行路径
索引1正在执行的 JavaScript 文件的路径
之后的每个元素依次为传递的命令行参数(从索引2开始是命令行参数) */
console.log(
  process.argv,
  process.argv[2]
)



// 返回当前工作目录, 我的理解是终端执行时的目录路径
console.log(process.cwd())
// cpu架构
console.log(process.arch)
// Node.js 版本
console.log(process.version)
// 当前操作系统的名称
console.log(process.platform)



// process.nextTick()将在下一轮事件循环中调用, 下一轮事件循环中立即调用
process.nextTick(function () {
  console.log('nextTick callback!');
});
console.log('nextTick was set!');



// Node.js 进程即将退出时的回调函数:
process.on('exit', function (code) {
  console.log('about to exit with code: ' + code);
});