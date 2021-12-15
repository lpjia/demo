const idx = async (ctx, next) => {
  ctx.render('index.html', { title: 'Welcome' })
}

module.exports = {
  'GET /': idx
}