const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => factories(app));
afterEach(async () => {
  // 在每个测试案例执行完后清理数据库
  await Promise.all([
    app.model.User.destroy({ truncate: true, force: true }),
  ]);
});