/* https://zh.javascript.info/date#zi-dong-xiao-zhun-autocorrection

https://www.yuque.com/moyanfs/js/qwxnnt
语雀上有人总结了思维导图

占位 */

import { formatTime } from '../util/commonMethod.js'

let dateObj = new Date()
  , year = dateObj.getFullYear()
  , month = dateObj.getMonth() + 1
  , day = dateObj.getDate()
  , hour = dateObj.getHours()
  , minute = dateObj.getMinutes()
  , second = dateObj.getSeconds()
  , timestamp = dateObj.getTime();

/* getMonth() 得到的月份数字, 比实际月份小1 */
console.log(dateObj)
console.log(year)
console.log(month)
console.log(day)
console.log(hour)
console.log(minute)
console.log(second)
console.log(timestamp)
console.log(Date.now()) // 推荐, 获取当前时刻的时间戳


let date1 = formatTime(dateObj, 'Y-M-D')
console.log('date1: ', date1)


/* 年月日按参数形式传, 月份要按常理-1 (6月份要传5) */
let date2 = formatTime(new Date(year, month - 1, day), 'Y-M-D')
console.log('date2: ', date2)


/* 年月日按数组形式传 */
let arr = [year, month, day]
let date3 = formatTime(new Date(arr), 'Y-M-D')
console.log('date3: ', date3)
// /* 数组形式转参数形式, 作对比, 不推荐这样用 */
// let param = Date.apply(null, arr)
// let date4 = formatTime(param, 'Y-M-D')
// console.log('date4: ', date4)


/* 自动校准功能, 处理年月日等, 不用再麻烦的处理
先get 再set */
let date10 = new Date(dateObj)
let num = date10.getDate() + 14
console.log('date10:', date10)
console.log(
  formatTime(date10, 'Y-M-D')
)
console.log(
  /* date实例.setDate(x) 把date实例已经+-处理后成相应日期, date实例现在已经变了 */
  date10.setDate(num) // 返回的是一个时间戳
)
console.log('当前时间加了半个月:', formatTime(date10, 'Y-M-D'))


let date11 = new Date(dateObj)
let num2 = date11.getDate() - 7
console.log('date11:', formatTime(date11, 'Y-M-D'))
console.log('当前时间减去一周:', formatTime(date11.setDate(num2), 'Y-M-D'))


let num3 = date10.getDate() - 7
console.log('刚加个半个月的, 再减去一周:', formatTime(date10.setDate(num3), 'Y-M-D'))


let date12 = new Date(dateObj)
let num4 = date12.getMonth() + 3
console.log('当前时间加三个月: ', formatTime(date12.setMonth(num4), 'Y-M-D'))


let date13 = new Date(dateObj)
let y = date13.getFullYear() + 1
let m = date13.getMonth() + 2
let d = date13.getDate() + 21
console.log('比当前日期多了一年又两月又三周:', formatTime(new Date(y, m, d), 'Y-M-D'))
console.log(
  null,
  y
  , m
  , d
  /* 数组里的值, 超出了Date的合法范围, 属于无效日期
  new Date(y, m, d) 年月日按参数形式传, 入参范围比数组大得多 */
  , formatTime(new Date([y, m + 1, d]), 'Y-M-D') // 数组形式传参, 月份要按实际月份传, getMonth()得到的值得加1
  , formatTime(new Date(...[y, m, d]), 'Y-M-D') // 解构数组, 转成了new Date(y, m, d)传参形式
)


/* 比较时间, 可不用转为时间戳 .getTime(), 直接比大小 */
console.log(new Date() > new Date('2023'))
console.log(new Date() > new Date('2022-10'))
console.log(new Date() - new Date('2022-10'))



/* 看dayjs */
const timestampStr = '1750089599000'
console.log(
  new Date(timestampStr), // Invalid Date 无效的日期
  formatTime(new Date(Number(timestampStr)), 'Y-M-D h:m:s'), // 2025-06-16 23:59:59
)