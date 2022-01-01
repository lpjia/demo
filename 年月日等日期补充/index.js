import { fetchGet } from '../util/fetchRequest.js'
import { formatTime } from '../util/commonMethod.js'
import { fillDate } from '../util/dates.js'
import { recentlyDate } from '../util/dates.js'


const currentDate = new Date()


function generateData() {
  return [
    {
      "dateTime": recentlyDate(currentDate, 2),
      "alarmCount": 100
    },
    {
      "dateTime": recentlyDate(currentDate, 5),
      "alarmCount": 80
    },
    {
      "dateTime": recentlyDate(currentDate, 3, 'after'),
      "alarmCount": 50
    },
  ]
}


async function init() {
  const y = await fetchGet('mock/y.json')
  console.log('源数据 y: ', y)
  const newY = fillDate(y, {
    timeField: 'dateTime',
    valField: 'alarmCount',
    startStr: '2010',
    endStr: '2022',
    dateType: 'Y',
    fillVal: null
  })
  console.log('newY: ', newY)
  console.log('---- 分割线 ----\n\n\n')


  const ym = await fetchGet('mock/ym.json')
  console.log('源数据 ym: ', ym)
  const newYM = fillDate(ym, {
    timeField: 'dateTime',
    valField: 'alarmCount',
    startStr: '2021-08',
    endStr: '2022-05',
    dateType: 'Y-M',
    fillVal: 2
  })
  console.log('newYM: ', newYM)
  console.log('---- 分割线 ----\n\n\n')


  const ymd = await fetchGet('mock/ymd.json')
  console.log('源数据 ymd: ', ymd)
  const newYMD = fillDate(ymd, {
    timeField: 'dateTime',
    valField: 'alarmCount',
    startStr: '2021-12-17',
    endStr: '2022-01-05',
    dateType: 'Y-M-D'
  })
  console.log('newYMD: ', newYMD)
  console.log('---- 分割线 ----\n\n\n')


  console.log('一周前日期 str: ', recentlyDate(currentDate, 7))
  console.log('currentDate str: ', formatTime(currentDate, 'Y-M-D'))
  console.log('一周后日期 str: ', recentlyDate(currentDate, 7, 'after'))
  console.log('---- 分割线 ----\n\n\n')


  const ymd2 = generateData()
  console.log('源数据 ymd2: ', ymd2)
  const newYMD2 = fillDate(ymd2, {
    timeField: 'dateTime',
    valField: 'alarmCount',
    startStr: recentlyDate(currentDate, 7),
    endStr: recentlyDate(currentDate, 7, 'after'),
    dateType: 'Y-M-D'
  })
  console.log('newYMD2: ', newYMD2)
}
init()