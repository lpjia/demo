import { Context, Next } from "koa";

const TestMiddleware = (ctx: Context, next: Next) => {
  console.log('TestMiddleware ' + new Date().getSeconds())
  // next()
  return next()
}

export default TestMiddleware