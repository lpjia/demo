/**
 * @description 对象转对象数组
 * @description 类似枚举的数据源, 转成 el-select 需要的数据结构
 * @param {object} obj 
 * @param {object} @field lKey 显示文本label的字段名 @field vKey 需要传值的字段名 @field isNum 是否把值转为number类型
 * @returns {array}
 */
export function objToArr(obj, { lKey = 'name', vKey = 'id', isNum = false } = {}) {
  let keys = Object.keys(obj)
    , result = []
  for (const k of keys) {
    let o = {
      [lKey]: obj[k],
      [vKey]: isNum ? Number(k) : k
    }
    result.push(o)
  }
  return result
}


/**
 * @description 对象数组转对象
 * @description 接口返回的数据结构需要转换成类似枚举
 * @param {array} arr 
 * @param {object} @field kField 定为对象key的字段名 @field vField 定为相应val的字段名
 * @returns {object}
 */
export function arrToObj(arr, { kField = 'value', vField = 'name' } = {}) {
  const obj = arr.reduce(
    (acc, cur) => {
      acc[cur[kField]] = cur[vField]
      return acc
    },
    {}
  )
  return obj
}