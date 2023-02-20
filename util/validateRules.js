/* valid 有效的
validate 验证
validator 验证器 */

/* 自用的校验规则, 可以先不考虑边缘情况, 直接用 */



/**
 * @description 校验合法email
 * @param {string} email
 * @returns {boolean}
 */
export function validEmail(email) {
  const reg = /^\w+@\w+\.\w+$/i
  return reg.test(email)
}

/* --------------------------------------------------------------------- */

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
 * @param {string | number} str 
 * @returns {boolean}
 */
export function validFloat(str) {
  if (!(typeof str === 'string' || typeof str === 'number')) return false
  let num = Number(str)
  if (Number.isNaN(num)) return false
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num);
}


/**
 * @description 校验 IP 是否合法
 * @param {string} ip 
 * @returns {boolean}
 */
export function validIp(ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}