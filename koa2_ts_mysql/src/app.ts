import * as dotenv from 'dotenv'
const dotenvConfig = dotenv.config()
import dotenvExpand from "dotenv-expand"
dotenvExpand.expand(dotenvConfig)

import db from './db'
db()

import { Server } from "http";
import Koa from "koa";
import router from "./router";
import config from "../config";
import AccessLogMiddleware from './middleware/AccessLogMiddleware';


const app = new Koa()

// 在这用中间件, 是全局中间件
app
  .use(AccessLogMiddleware) // 访问日志
  .use(router.routes()) // 启动路由

const { port } = config.server

const run = async (): Promise<Server> => {
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