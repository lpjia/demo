const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});

// export.module = { router}
// export default router