/* 为 js 工具写类型声明文件, 用 CJM 导出 */


// 把对象属性拆分成单独对象, 再push到数组
function objKeyToOrmField(obj = {}, options) {
  const newArr = []
    , newObj = {}
  Object.assign(newObj, obj)

  // 增加对象属性
  if (options?.assign) {
    Object.assign(newObj, options.assign)
  }

  // 排除某些字段
  if (options?.exclude) {
    for (const item of options.exclude) {
      delete newObj[item]
    }
  }

  for (const key in newObj) {
    if (Object.hasOwnProperty.call(newObj, key)) {
      const val = newObj[key];
      newArr.push({ [key]: val })
    }
  }

  return newArr
}

module.exports = {
  objKeyToOrmField,
}