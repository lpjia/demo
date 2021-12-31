import { fetchGet } from '../util/fetchRequest.js'
import { fillDate } from '../util/dates.js'

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
}
init()