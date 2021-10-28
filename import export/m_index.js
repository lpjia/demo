// 命名导出/按需导出
export const obj = {
  one: 1,
  two: 2,
  three: 3,
}


export function fn() {
  console.log('这是命名导出一个方法')
  return '方法返回的东东'
}


// 命名导出重命名
export { obj as aObjj }


// 默认导出
const arr = [123, 456, 789]
export default arr