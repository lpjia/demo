


/**
 * @description 验证是否只有数字
 * @param {string} str
 * @param {number} n 需要限制的位数
 * @returns {boolean}
 */
export function validIntString(str, n) {
  if (typeof str !== 'string') throw new Error('一参请传入 string 类型参数')
  let reg = null
  if (typeof n === 'undefined')
    reg = /^[0-9]*$/
  else if (typeof n === 'number')
    reg = new RegExp("^\\d{" + n + "}$") // ^\d{n}$
  else throw new Error('二参请传入 number 类型参数')

  return reg.test(str);
}



/**
 * @description 去掉字符串中的所有空格
 * @param {string} str #need
 * @returns {string}
 */
export function removeAllSpace(str) {
  if (typeof str !== 'string') throw new Error('请传入 string 类型参数')
  return str.replace(/\s*/g, "")
}


/**
 * @description 验证是否为有效的浮点型
 * @param {string / number} str 
 * @returns {boolean}
 */
export function validFloat(str) {
  if (!(typeof str === 'string' || typeof str === 'number')) throw new Error('请传入 string/number 类型参数')
  let num = Number(str)
  if (Number.isNaN(num)) throw new Error('参数不能转为有效的 number 类型')
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num);
}
// 下面这个没加到 util/validate.js
/**
 * @description 验证是否为有效的浮点型
 * @param {number} num 只能传数字
 * @returns {boolean}
 */
export function validFloat2(num) {
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num);
}