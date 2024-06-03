/* eslint valid-jsdoc: "off" */

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
  config.keys = appInfo.name + '_1711778121973_6347';

  /* 应用级别的中间件, 按顺序加载
  写到数组里意味着默认启用该中间件 */
  // config.middleware = [];
  config.middleware = ['robot', 'errorHandler', 'notFoundHandler', 'underlineToCamel', 'commonFieldHandler'];

  config.interceptor = {}
  config.robot = {
    ua: [/Baiduspider/i],
    /* 中间件的通用配置 */
    // match(ctx) { }
    match: '/api/customer_error'
  };
  config.commonFieldHandler = {
    // enable: false, // 是不是启用
  }

  /* 这里得把数据库的信息补齐, 包括账号和密码 */
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'try',
    username: 'try',
    password: 'try',
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost',
      port: 3306,
      database: 'try',
      user: 'try',
      password: 'try',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  // 配置csrf的跨域攻击
  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: ['*'],
    domainWhiteList: ['http://127.0.0.1:8848', 'http://127.0.0.1:5500'],
  };


  /* config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }; */
  config.news = {
    pageSize: 10,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };
  config.view = {
    mapping: {
      '.ejs': 'ejs',
      '.html': 'ejs',
    },
  };


  config.validate = {
    convert: true, // 对参数可以使用 convertType 规则进行类型转换, 原先期望是数字类型的字段就会始终验证不过
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
