
console.log('简单数据类型 最简单的形式')
const arr = ["Google", "Runoob", "Taobao"]
console.table(arr)
// 文本换行用 \n
console.log('---- 分割线 ----\n\n\n')


console.log('对象')
const arr3 = {
  name: "菜鸟教程",
  site: "www.runoob.com"
}
console.table(arr3)
console.log('---- 分割线 ----\n\n\n')


/**
 * console.table() 方法用于在控制台输出表格信息。
 * 第一个参数是必需的，且对象类型需要是对象或数组，对应的数据会填充到表格中。
 */
console.log('一般是对象数组')
const site1 = { name: "Runoob", site: "www.runoob.com" }
const site2 = { name: "Google", site: "www.google.com" }
const site3 = { name: "Taobao", site: "www.taobao.com" }
const arr2 = [site1, site2, site3]
console.table(arr2)
console.log('---- 分割线 ----\n\n\n')


console.log('%c这是一个测试', 'color:red;font-size:50px')
console.log('---- 分割线 ----\n\n\n')


// 严谨写法
window.console && console.log('%c 前面有空格的效果', 'color:deepskyblue;font-size:50px;')
console.log('---- 分割线 ----\n\n\n')