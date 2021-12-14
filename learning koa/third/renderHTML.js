const nunjucks = require('nunjucks');

// 模版引擎工具
function createEnv(path, opts) {
  let autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('views', {
        noCache: noCache,
        watch: watch,
      }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    });
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

// 创建模版
let env = createEnv('views', {
  watch: true,
  noCache: true,
  filters: {
    hex: function (n) {
      return '0x' + n.toString(16);
    }
  }
});

module.exports = env