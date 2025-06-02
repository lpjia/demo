function require(modulePath) {
  // 1.根据传递的模块路径, 得到模块完整的绝对路径
  var moduleId = getModuleId(modulePath);
  // 2.判断缓存
  if (cache[moduleId]) {
    return cache[moduleId]
  }
  // 3.真正运行模块代码的辅助函数
  function _require(exports, require, module, __filename, __dirname) {
    // 目标模块的代码在这里
    // commonJS的模块代码都放到一个函数环境里了
  }
  // 4.准备并运行辅助函数
  var module = {
    exports: {}
  };
  var exports = module.exports
  // 得到模块文件的绝对路径
  var __filename = moduleId
  // 得到模块所在目录的绝对路径
  var __dirname = getDirname(__filename)

  _require.call(exports, exports, require, module, __filename, __dirname)

  // 5.缓存module.exports
  cache[moduleId] = module.exports
  // 6.返回module.exports
  return module.exports
}