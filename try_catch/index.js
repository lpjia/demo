/* 只能捕获同步错误, 不能捕获异步的错误
比如定时器内, 再抛出错误, 捕获不到 */

try {
  setTimeout(() => {
    const num = 1 / 0; // 故意制造错误
    console.log(num);
  }, 1000);
} catch (err) {
  // 这里捕获不到！因为 setTimeout 回调是异步执行的，外层 try/catch 已经结束
  console.log("捕获错误：", err);
}