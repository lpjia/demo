const NotFoundException = require("../exception/notFound");

module.exports = (options, app) => {
  return async function notFoundHandlerMiddleware(ctx, next) {
    await next();

    if (ctx.status === 404 && !ctx.body) {
      throw new NotFoundException()
    }
  };
};
