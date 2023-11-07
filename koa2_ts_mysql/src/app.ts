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
import koaBody from 'koa-body';
import cors from '@koa/cors';
import koaStatic from "koa-static";



const app = new Koa()

// 在这用中间件, 是全局中间件
app
  .use(koaBody({
    multipart: true,
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
  }))
  .use(cors({
    origin() { //设置允许来自指定域名请求
      return 'http://127.0.0.1:8848'; //只允许这个域名的请求
    },
    maxAge: 86400, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  }))
  .use(koaStatic(__dirname + '/../static')) // 找static目录, 作为访问文件资源的根目录
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