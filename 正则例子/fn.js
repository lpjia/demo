
/**
 * 已整理到 validate.js
 * @description 去掉字符串中的所有空格
 * @param {string} str #need
 * @returns {string}
 */
function removeAllSpace(str) {
  if (typeof str !== 'string') throw new Error('请传入 string 类型参数')
  return str.replace(/\s*/g, "")
}


/**
 * 已整理
 * @description 验证是否为有效的浮点型
 * @param {string / number} str 
 * @returns {boolean}
 */
function validFloat(str) {
  if (!(typeof str === 'string' || typeof str === 'number')) throw new Error('请传入 string/number 类型参数')
  let num = Number(str)
  if (Number.isNaN(num)) throw new Error('参数不能转为有效的 number 类型')
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num);
}
/**
 * @description 验证是否为有效的浮点型
 * @param {number} num 只能传数字
 * @returns {boolean}
 */
function validFloat2(num) {
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num);
}