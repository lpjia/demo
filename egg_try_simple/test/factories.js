const { factory } = require('factory-girl');

module.exports = (app) => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 模型和默认数据
  factory.define('user_list', app.model.User, {
    name: factory.sequence('User.name', (n) => `name_${n}`),
    age: 18,
  });
};