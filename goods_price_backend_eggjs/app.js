const { join: pahtJoin } = require('node:path');

module.exports = (app) => {
  // 加载所有的校验规则
  const directory = pahtJoin(app.config.baseDir, 'app/validator');
  app.loader.loadToApp(directory, 'validate');
};