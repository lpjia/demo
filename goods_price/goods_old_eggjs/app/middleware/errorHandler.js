const HttpException = require('../exception/http');

module.exports = (options, app) => {
  return async function errorHandlerMiddleware(ctx, next) {
    const { method } = ctx.request;
    if (method === 'OPTIONS') {
      ctx.status = 204;
      return;
    }

    try { // 在这里捕获程序中的异常
      await next();
    } catch (err) {
      /* 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      终端会记录错误日志 */
      ctx.app.emit('error', err, ctx);

      // 判断异常是不是自定义异常
      if (err instanceof HttpException) {
        ctx.status = err.httpCode;
        ctx.body = {
          code: err.code,
          msg: err.msg,
          data: err.data,
        };
        return;
      }
      // ... 其他异常处理，例如，可以在这里处理

      /* egg参数校验异常 */
      if (err.status === 422) {
        ctx.status = 409;
        ctx.body = {
          code: 40009,
          msg: err.message,
          data: err.errors,
        };
        return;
      }


      /* 最后其他异常统一处理 */
      ctx.status = 500;
      ctx.body = {
        code: 50000,
        msg: err.message || '服务器异常',
        data: null,
      };
    }
  };
};