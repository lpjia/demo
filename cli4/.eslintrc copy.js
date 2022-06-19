// 有时间研究下怎么配置
module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "plugin:vue/essential",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "parser": "babel-eslint",
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    // "generator-star-spacing": "off",
    // "no-tabs": "off",
    "no-unused-vars": "off", // 没使用的变量
    // "no-console": "off",
    // "no-irregular-whitespace": "off",
    // "no-debugger": "off"
  }
};