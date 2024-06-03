const HttpException = require('../exception/http');

module.exports = (options, app) => {
  return async function errorHandlerMiddleware(ctx, next) {
    /* try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    } */


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
      // ... 其他异常处理，例如egg参数校验异常，可以在这里处理


      // 最后其他异常统一处理
      ctx.status = 500;
      ctx.body = {
        code: 50000,
        msg: err.message || '服务器异常',
        data: null,
      };
    }
  };
};