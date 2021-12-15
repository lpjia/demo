// 引入模版工具, 生成的模版就是字符串
const env = require('../renderHTML')
let html = env.render('hello.html', {
  name: '小明',
  age: 18,
  list: [11, 22, 33]
});

const hello = async (ctx, next) => {
  // const name = ctx.params.name
  // ctx.response.body = `<h1>Hello, ${name}!</h1>`;
  ctx.response.body = html
}

module.exports = {
  'GET /hello/:name': hello
}