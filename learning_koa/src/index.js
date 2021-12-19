import Koa from 'koa'
const app = new Koa();

app.listen(8101, () => {
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:8101`);
});