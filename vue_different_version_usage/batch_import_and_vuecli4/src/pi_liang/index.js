// webpack中一切文件皆模块

// https://www.webpackjs.com/guides/dependency-management/#requirecontext

// webpack才能用的, 返回一个上下文模块
// 也是一个函数, 可以调, 传入模块路径
const modulesFiles = require.context('./modules', true, /\.js$/)
console.log('modulesFiles:', modulesFiles)

// 获取所有匹配的文件路径
for (const module_path of modulesFiles.keys()) {
  console.log('module_path:', module_path)
}

// 用累计器来组装需要的map
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  console.log('modules:', modules)
  console.log('modulePath:', modulePath)
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  console.log('moduleName:', moduleName)
  // 获取模块导出的内容
  const value = modulesFiles(modulePath)
  console.log('value:', value)
  // 拿到模块的默认导出, 并赋值给对应的模块文件名的key
  modules[moduleName] = value.default
  return modules
}, {})
console.log('最终map modules:', modules)


// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const result = requireAll(modulesFiles)
// console.log('result:', result)