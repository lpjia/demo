// 获取模块, 返回一个key是路径的map
const modulesMap = import.meta.glob('./modules/**/*.js', { eager: true })

console.log('modulesMap:', modulesMap)

// 获取路径(因为路径有可能很复杂, 所以自动获取)
const modulesKeys = Object.keys(modulesMap)
console.log('modulesKeys:', modulesKeys)

// 获取模块导出的内容
Object.keys(modulesMap).map(modulePath => modulesMap[modulePath]).forEach(module => {
  console.log('module:', module)
  console.log('module.default:', module.default)
})



// /* 获取按需导入模块 */
// // 获取模块, 返回一个key是路径的map
// const modulesMap = import.meta.glob('./modules/**/*.js')
// console.log('modulesMap:', modulesMap)

// // 获取路径(因为路径有可能很复杂, 所以自动获取)
// const modulesKeys = Object.keys(modulesMap)
// console.log('modulesKeys:', modulesKeys)

// // 获取按需导入, () => import(xxx)
// Object.keys(modulesMap).map(modulePath => modulesMap[modulePath]).forEach(moduleFn => {
//   console.log('moduleFn:', moduleFn)
// })