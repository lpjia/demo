/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }


  /* 数据库 ORM */
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  mysql: {
    enable: false,
    package: 'egg-mysql'
  },

  /* 参数校验 */
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  /* 配置跨域插件 */
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  /* html模版引擎插件, 一般前后端分离项目不用这个 */
  nunjucks: {
    enable: false,
    package: 'egg-view-nunjucks',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
};
