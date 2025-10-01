
/* 判断对象 */
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

/* 转int */
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/* 键名, 下划线转小驼峰 */
function underlineToCase(str) {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}
/* 键名, 小驼峰转下划线 */
function caseToUnderline(str) {
  return str.replace(/([A-Z])/g, function (match, letter) {
    return '_' + letter.toLowerCase();
  });
}
/* 字段名转换 */
function fieldToCase(oldKeyObj, toFn) {
  if (Object.keys(oldKeyObj).length) {
    let obj = {}
    for (const key in oldKeyObj) {
      if (Object.hasOwnProperty.call(oldKeyObj, key)) {
        let newKey = toFn(key)
        obj[newKey] = oldKeyObj[key]
      }
    }
    return obj
  }
}
/* 不需要考虑对象还是数组, 就算是数组, 遍历数组后一样处理 */
/* 下划线转小驼峰 */
function toSmallHump(o) {
  return fieldToCase(o, underlineToCase)
}
/* 小驼峰转下划线 */
function toUnderlineCase(o) {
  return fieldToCase(o, caseToUnderline)
}


module.exports = {
  isObject,
  toInt,
  toSmallHump,
  toUnderlineCase,
}