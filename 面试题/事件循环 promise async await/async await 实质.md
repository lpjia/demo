### async await

async 确保了函数返回一个 promise，也会将非 promise 的值包装进去

``` javascript
/* await 表达式
await 总会同步地对表达式求值并处理，处理的行为与 Promise.resolve() 一致。
若表达式的值不是 Promise，await 会把该值转换为已兑现的 Promise，然后返回其结果。
Promise.resolve(value)就是对value的包装, 满足期望返回一个promise。 */
```

``` javascript
// 立即把一个函数添加到微队列
Promise.resolve().then(函数)
```

await xxx(); 表示xxx函数"完成"后, 也就是fulfilled的状态

await下的代码会被放入微队列去执行

### 事件循环 分析模版

``` javascript
/* 
微队列: 
交互队列:
延时队列: 


运行流程:



打印输出的顺序:

*/
```