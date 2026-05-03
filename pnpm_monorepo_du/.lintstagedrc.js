export default {
  "*.{js,ts,mjs,cjs,json,tsx,css,less,scss,vue,html,md}": ["cspell lint --no-must-find-files"], // cspell lint 没有匹配到文件时会报错, 加了--no-must-find-files不报错
  "*.{js,ts,vue,md}": ["prettier --write", "eslint"]
};
