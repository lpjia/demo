const Koa = require('koa');
const router = require('./router')
// const router = require('koa-router')()

// console.log('router: ', router)


// 实例化
const app = new Koa();

// 打印请求方法和路径
app.use(async (ctx, next) => {
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


// router.get('/', async (ctx, next) => {
//   ctx.response.body = '<h1>Index</h1>';
// });
// app.use(router.routes())

// 响应内容
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});

/*
app.use(async (ctx, next) => {
  if (await checkUserPermission(ctx)) {
    await next();
  } else {
    ctx.response.status = 403;
    console.log(`测试简写 ${ctx.status}`)
  }
}); */

app.listen(8100, () => {
  console.log('app started at port 8100...');
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:8100`);
});