// https://zh.javascript.info/date#zi-dong-xiao-zhun-autocorrection

import { formatTime } from '../util/commonMethod.js'

let _date = new Date()
  , year = _date.getFullYear()
  , month = _date.getMonth() + 1
  , day = _date.getDate()
  , timestamp = _date.getTime()
console.log(_date, year, month, day, timestamp)

let date = formatTime(_date, 'Y-M-D')
console.log('date: ', date)

// 年月日按参数形式传
let date2 = formatTime(new Date(year, month - 1, day), 'Y-M-D')
console.log('date2: ', date2)

// 年月日按数组形式传
let arr = [year, month, day]
let date3 = formatTime(new Date(arr), 'Y-M-D')
console.log('date3: ', date3)

// 数组形式转参数形式, 作对比
let param = Date.apply(null, arr)
let date4 = formatTime(param, 'Y-M-D')
console.log('date4: ', date4)

// 自动校准功能, 处理日, 不用再麻烦的处理
let num = _date.getDate() + 14
_date.setDate(num) // 返回的是一个时间戳
console.log('时间加了半个月: ', _date)
let date5 = formatTime(_date, 'Y-M-D')
console.log('时间加了半个月 date5: ', date5)
let num2 = _date.getDate() - 7
_date.setDate(num2)
console.log('时间再减一周: ', _date)
let date6 = formatTime(_date, 'Y-M-D')
console.log('时间再减一周 date6: ', date6)
console.log('也就是比当前日期多了一周!')

// 月
let num3 = _date.getMonth() + 1
_date.setMonth(num3)
console.log('时间再加一个月: ', _date)
let date7 = formatTime(_date, 'Y-M-D')
console.log('时间再加一个月 date7: ', date7)
console.log('也就是比当前日期多了一月又一周!')

// 年
let num4 = _date.getFullYear() + 1
_date.setFullYear(num4)
console.log('时间再加一年: ', _date)
let date8 = formatTime(_date, 'Y-M-D')
console.log('时间再加一年 date8: ', date8)
console.log('也就是比当前日期多了一年又一月又一周!')




// 比较时间, 可不用转为时间戳 .getTime()
console.log(new Date() > new Date('2023'))
console.log(new Date() > new Date('2022-10'))
console.log(new Date() - new Date('2022-10'))