import * as R from 'ramda';

// 用库方法来封装判定是否为空
// false 0除外, 在这不判定为空
// null undefined NaN '' {} []
export const isEmpty = (key: any) => {
  if (R.isNil(key)) return true // 是null或undefined
  return Number.isNaN(key) ? true : R.isEmpty(key)
}
// 先判断属性是否存在
// res.data && res.data.xxx