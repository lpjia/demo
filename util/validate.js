/**
 * @description 验证是否为有效的浮点型
 * @param {string / number} str 
 * @returns {boolean}
 */
export function validFloat(str) {
  if (!(typeof str === 'string' || typeof str === 'number')) return false
  let num = Number(str)
  if (Number.isNaN(num)) return false
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num);
}