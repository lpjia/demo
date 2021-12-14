const Koa = require('koa');
const bodyParser = require('koa-bodyparser');


// const router = require('./router')
// 导入controller middleware:
const controller = require('./controller');


// 实例化
const app = new Koa();


// 打印请求方法和路径
app.use(async (ctx, next) => {
  // console.log(`${ctx.request.method} ${ctx.request.url}`)
  console.log(`${ctx.method} ${ctx.url}`)
  await next()
})


// 打印时间
app.use(async (ctx, next) => {
  const sTime = new Date().getTime()
  await next()
  const ms = new Date().getTime() - sTime
  console.log(`Time: ${ms}ms`)
})


app.use(bodyParser());


// app.use(router.routes())
// 使用middleware:
app.use(controller());


app.listen(8100, () => {
  console.log('app started at port 8100...');
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:8100`);
});
