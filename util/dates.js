// 由于 formatTime 很早就放在了 commonMethod.js 中, 被使用了很多, 所以不建议再迁移
import { formatTime } from './commonMethod.js'



/**
 * @description 补充日期数据, 主要为 echarts 处理数据
 * @param {array} arr 对象数组, 时间可乱序
 * @param {object} @field startStr 开始日期 @field endStr 结束日期, 不填则默认当天 
 *                 @field timeField 时间字段 @field valField 值字段
 *                 @field fillVal 任意填充值 @field dateType 日期类型, 默认年月日
 * @returns {array}
 */
export function fillDate(arr, {
  startStr, endStr = new Date(),
  timeField, valField,
  fillVal = 0, dateType = 'Y-M-D',
}) {
  if (!Array.isArray(arr)) throw new Error('fillDate 方法必须传入数组!')
  if (!(startStr && timeField && valField)) throw new Error('fillDate 方法的参数必须传!')
  let result = []
    , startDate = new Date(startStr)
    , endDate = new Date(endStr)
  while (endDate - startDate >= 0) {
    let currDate = formatTime(startDate, dateType)
      , idx = -1
    let leng = arr.length
    for (let i = 0; i < leng; i++) {
      if (arr[i][timeField] === currDate) idx = i
    }
    if (idx !== -1) result.push(arr[idx])
    else {
      result.push({
        [timeField]: currDate,
        [valField]: fillVal
      })
    }
    if (dateType === 'Y-M-D') startDate.setDate(startDate.getDate() + 1)
    else if (dateType === 'Y-M') startDate.setMonth(startDate.getMonth() + 1)
    else if (dateType === 'Y') startDate.setFullYear(startDate.getFullYear() + 1)
  }
  return result
}