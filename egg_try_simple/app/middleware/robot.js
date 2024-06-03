module.exports = (options, app) => {
  // options === app.config.robot
  // options: 中间件的配置项
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some((ua) => ua.test(source));
    console.log('robotMiddleware next()之前')
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
      console.log('robotMiddleware next()之后')
    }
  }
}