/* eslint valid-jsdoc: "off" */
const { join: pathJoin } = require('node:path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1719529660572_4350';

  // add your middleware config here
  // config.middleware = ['errorHandler', 'notFoundHandler', 'underlineToCamel'];
  config.middleware = ['errorHandler', 'notFoundHandler'];

  // 只对以 /api 为前缀的 URL 路径生效
  config.errorHandler = {
    match: '/api',
  };

  /* 把vue打好的包作为静态资源
  好处是简单, 不需要额外的插件和代码
  坏处是当vue路由使用WebHash时, 页面路径相当难看http://127.0.0.1:7001/index.html#/home
  不过这个路径管理后台不介意, http://121.36.69.145:7001/index.html

  想要的页面路径是http://127.0.0.1:7001/home, 怎么实现?
  或者先实现http://127.0.0.1:7001/#/home ? */
  config.static = {
    prefix: '/', // 访问静态资源的前缀URL路径
    dir: pathJoin(appInfo.baseDir, 'app/public/dist'), // 这里我们改为Vue项目的dist目录
  }

  /* 这里得把数据库的信息补齐, 包括账号和密码 */
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'goods',
    username: 'try',
    password: 'try',
    timezone: '+08:00', // 时区要设置, 否则mysql存datetime类型的数据, 前端传的和数据库存的不一致
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }

  /* 配置csrf的跨域攻击 */
  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: ['*'],
    // domainWhiteList: ['http://127.0.0.1:8848', 'http://127.0.0.1:5500'],
    domainWhiteList: [
      'http://127.0.0.1:8848',
      'http://127.0.0.1:5500',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4173'
    ],
  };

  config.cors = {
    // origin: '*', // 和domainWhiteList冲突, 此属性优先生效
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS', // OPTIONS请求一直发出, 请关闭浏览器的Disable cache
    allowHeaders: '*',
  };

  config.validate = {
    convert: true, // true表示对参数可以使用 convertType 规则进行类型转换
    // // 不加此配置项之前, 例如id字段, 一般前端传的是string类型(包括query和params), 后台校验定的数字类型, 就会始终验证不过
    // validateRoot: false,   // 限制被验证值必须是一个对象。
    widelyUndefined: true, // 会把空字符串，NaN,null 这些转成 undefined，将这些异常的数据进行了统一，方便后续处理
  }

  config.jwt = {
    maxAge: 7200, // token过期时间，单位秒
    secret: 'b2ce49e4a541068d', // token签名秘钥
    refresh_maxAge: 259200,
    refresh_secret: 'b2ce49e4a541068c',
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
