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


/**
 * @description 校验 IP 是否合法
 * @param {string} ip 
 * @returns {boolean}
 */
export function validIp(ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}