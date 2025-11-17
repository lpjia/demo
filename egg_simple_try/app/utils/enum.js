/* 数据库字段, 枚举类型的值, 在后端定好并且映射, 使用Map实例
数据库存int类型数据
增加枚举值后也要同步更新到数据库字段注释 */

/* 性别 */
const genderMap = new Map([
  [0, '未知'],
  [1, '男'],
  [2, '女'],
])

/* 账号状态 */
const userStatusMap = new Map([
  [1, '正常'],
  [2, '黑名单'],
])

const m = {
  'gender': genderMap,
  'status': userStatusMap,
}

/* int转实际显示的内容
使用 user.gender = toRealVal('gender', user.gender) */
function toRealVal(str, mapKey) {
  return m[str].get(mapKey)
}

/* map转obj */
const genderObj = Object.fromEntries(genderMap)
const userStatusObj = Object.fromEntries(userStatusMap)

module.exports = {
  toRealVal,
  genderObj,
  userStatusObj,
}