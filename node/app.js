// https://www.liaoxuefeng.com/wiki/1022910821149312/1023025732384672


console.log('process.argv: ', process.argv)
console.log('获取命令行 process.argv[2]: ', process.argv[2])
// console.log('global: ', global)
console.log('---- 分割线 ----\n')


// 当前 js 文件:
console.log('current js file: ' + __filename);
// 当前 js 文件目录
console.log('current js dir: ' + __dirname);
console.log('---- 分割线 ----\n')


console.log('process === global.process: ', process === global.process)
console.log('process.version: ', process.version)
console.log('process.platform: ', process.platform)
console.log('process.arch: ', process.arch)
console.log('返回当前工作目录 process.cwd(): ', process.cwd())
// process.chdir('/private/tmp'); // 切换当前工作目录
console.log('---- 分割线 ----\n')


if (typeof (window) === 'undefined') {
  console.log('node.js');
} else {
  console.log('browser');
}
console.log('---- 分割线 ----\n')


// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
  console.log('nextTick callback!');
});
console.log('nextTick was set!');


// 程序即将退出时的回调函数:
process.on('exit', function (code) {
  console.log('about to exit with code: ' + code);
});