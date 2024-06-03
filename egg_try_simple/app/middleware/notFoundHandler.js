// app/middleware/notFoundHandler.js

module.exports = (options, app) => {
  return async function notFoundHandlerMiddleware(ctx, next) {
    await next();

    if (ctx.status === 404 && !ctx.body) {
      ctx.status = 404;
      // 返回自定义的 404 页面
      await ctx.render('404.html')
      /* 这里好像有隐患, 比如接口没有, 但是不需要返回页面, 尤其是前端控制路由的情况下
      有个想法: 可以用中间件配置, 忽略/api开头的路由 */
    }
  };
};
