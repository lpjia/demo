const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// 打印时间
app.use(async (ctx, next) => {
  const sTime = new Date().getTime()
  await next()
  const ms = new Date().getTime() - sTime
  console.log(`Time: ${ms}ms`)
})


// 处理静态文件
if (!isProduction) {
  const staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

/**
 * app.use 方法, 需要传入一个异步函数(ctx, next)
 */


// parse request body:
app.use(bodyParser());

// 增加
app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}));

// add controllers:
app.use(controller());

app.listen(8103, () => {
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:8103`);
});