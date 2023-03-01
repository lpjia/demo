/* valid 有效的
validate 验证
validator 验证器 */

/* 自用的校验规则, 可以先不考虑边缘情况, 直接用 */


/**
 * @description 校验合法https或http://
 * @param {string} str
 * @returns {boolean}
 */
export function validDomainUrl(str) {
  const reg = new RegExp("^(http|https)://", "i")
  return reg.test(str)
}


/**
 * @description 校验合法密码, 得包括大小写字母/数字/特殊字符, 最少6位长度
 * @param {string} str
 * @returns {boolean}
 */
export function validPassword(str) {
  const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!_@#$%^&*? ]).*$/
  return reg.test(str)
}


/**
 * @description 校验合法IP
 * @param {string} ip 
 * @returns {boolean}
 */
export function validIp(ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}


/**
 * @description 校验合法port
 * @param {string | number} port 
 * @returns {boolean}
 */
export function validPort(port) {
  const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(port);
}


/**
 * @description 校验合法数字, 得包含正负浮点数
 * @param {string | number} num
 * @returns {boolean}
 */
export function validFloat(num) {
  const reg = /^(-?\d+)(\.\d+)?$/
  return reg.test(num)
}


/**
 * @description 校验是否只有数字
 * @param {string | number} num
 * @returns {boolean}
 */
export function validNum(num) {
  const reg = /^[0-9]*$/
  return reg.test(num);
}


/**
 * @description 校验合法手机号
 * @param {string | number} mobilePhone
 * @returns {boolean}
 */
export function validMobilePhone(mobilePhone) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(mobilePhone)
}


/**
 * @description 校验合法email
 * @param {string} email
 * @returns {boolean}
 */
export function validEmail(email) {
  const reg = /^\w+@\w+\.\w+$/i
  return reg.test(email)
}


/**
 * @description 校验是否包含汉字
 * @param {string} str
 * @returns {boolean}
 */
export function validIncludesChinese(str) {
  const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  return reg.test(str)
}