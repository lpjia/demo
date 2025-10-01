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
  /* 参数校验 */
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  /* token */
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  /* 配置跨域插件 */
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
