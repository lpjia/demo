/* 拦截器
用来拦截处理响应的格式
官方推荐是用一个Controller 基类来实现返回统一格式
所以这个拦截器暂时不用 */

module.exports = (options, app) => {
  // options === app.config.xxx
  // options: 中间件的配置项
  return async function interceptorMiddleware(ctx, next) {
    /* next()之前的, 中间件位置越靠前越先执行 */
    await next();
    /* next()之后的, 中间件位置越靠前越晚执行 */
    /* 响应应该是排在最后的, 所以中间件的位置应放在第一个 */
    ctx.status = 201;
    ctx.body = "拦截器中间件";
  }
}