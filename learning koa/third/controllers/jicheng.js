// 引入模版工具, 生成的模版就是字符串
const env = require('../renderHTML')
let html = env.render('jicheng.html', {
  header: 'Hello',
  body: 'bla bla bla...'
});

const jicheng = async (ctx, next) => {
  ctx.response.body = html
}

module.exports = {
  'GET /jicheng': jicheng
}