import Koa from "koa";
import KoaBody from 'koa-body';
import router from "./router";


const app = new Koa()

// 在这用中间件, 是全局中间件
app
  .use(KoaBody())
  .use(router.routes()) // 启动路由

const port = 8810

const run = async () => {
  let main: any
  try {
    main = await app.listen(port)
    console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
  } catch (error) {
    console.log('error: ', error)
  }
  return main
}

export default run