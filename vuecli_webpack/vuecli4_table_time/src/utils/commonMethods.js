import dayjs from 'dayjs'

// 计算年龄, 精确到月
export function calcAges(birthday, deathday) {
  if (!birthday) return ''
  const currTime = dayjs(deathday ?? undefined)
    , birthdayTime = dayjs(birthday)
    , year = currTime.diff(birthdayTime, 'year')
    , month = currTime.diff(birthdayTime, 'month') % 12
    , age = `${year} 岁 ${month} 个月`
  return age
}

// 计算工龄, 精确到月
export function calcWorkingYears(startTime, endTime) {
  if (!startTime) return ''
  const currTime = dayjs(endTime ?? undefined)
    , workdayTime = dayjs(startTime)
    , year = currTime.diff(workdayTime, 'year')
    , month = currTime.diff(workdayTime, 'month') % 12
    , workingYears = `${year} 年 ${month} 个月`
  return workingYears
}