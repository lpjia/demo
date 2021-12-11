/**
 * @description 过滤掉对象为空值的字段(不过滤 0 和 false)
 * @param {object} obj
 * @return {object}
 */
export function removeObjEmptyKey(obj) {
  for (let item in obj) {
    if (!obj[item]) {
      let type = typeof (obj[item])
      switch (type) {
        case 'number':
          Number.isNaN(obj[item]) && delete obj[item];
          break;
        case 'boolean':
          break;
        default:
          delete obj[item]
      }
    }
  }
  return obj
}