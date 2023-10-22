/* 参数归一化
不同的参数情况汇集成一种
找出其中一种能涵盖其他所有的情况, 一定是功能最灵活最强大的情况(这里是函数的情况) */

function _formatNormalize(formatter) {
  if (typeof formatter === 'function') {
    return formatter
  }
  if (typeof formatter !== 'string') {
    throw new TypeError('formatter must be string or function')
  }

  if (formatter === 'date') {
    formatter = 'yyyy-MM-dd'
  }
  else if (formatter === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }
  return (dateInfo) => {
    const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo
    return formatter
      .replace('yyyy', yyyy)
      .replace('MM', MM)
      .replace('dd', dd)
      .replace('HH', HH)
      .replace('mm', mm)
      .replace('ss', ss)
      .replace('ms', ms);
  }
}

function format(date, formatter, isPad = false) {
  formatter = _formatNormalize(formatter)
  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  }
  dateInfo.yyyy = isPad ? dateInfo.year.toString().padStart(4, '0') : dateInfo.year;
  dateInfo.MM = isPad ? dateInfo.month.toString().padStart(2, '0') : dateInfo.month;
  dateInfo.dd = isPad ? dateInfo.date.toString().padStart(2, '0') : dateInfo.date;
  dateInfo.HH = isPad ? dateInfo.hours.toString().padStart(2, '0') : dateInfo.hours;
  dateInfo.mm = isPad ? dateInfo.minutes.toString().padStart(2, '0') : dateInfo.minutes;
  dateInfo.ss = isPad ? dateInfo.seconds.toString().padStart(2, '0') : dateInfo.seconds;
  dateInfo.ms = isPad ? dateInfo.milliseconds.toString().padStart(2, '0') : dateInfo.milliseconds;
  return formatter(dateInfo)
}

const time = new Date('2023-4-6 8:8:8.80')

console.log(
  // 2023-4-6
  format(time, 'date'),

  // 2023-4-6 8:8:8
  format(time, 'datetime'),

  // 2023-04-06
  format(time, 'date', true),

  // 2023-04-06 08:08:08
  format(time, 'datetime', true),

  // 2023年04月06日 08:08:08.800
  format(time, 'yyyy年MM月dd日 HH:mm:ss.ms', true),

  // 1年前, 只比较了年
  format(new Date('2022/3/3'), (dateInfo) => {
    const { year } = dateInfo
    const thisYear = new Date().getFullYear()
    if (year < thisYear) {
      return `${thisYear - year}年前`
    }
    else if (year > thisYear) {
      return `${year - thisYear}年后`
    }
    else {
      return '今年'
    }
  })
)

