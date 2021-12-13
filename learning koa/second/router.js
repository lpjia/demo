const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});

// module.exports = router
module.exports = 123