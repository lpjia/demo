import { Model } from 'sequelize-typescript'
import dayjs from 'dayjs'

interface TimeType extends Model {
  createTime?: string
  updateTime?: string
}

export function formatTime<T extends TimeType>(data: T): T {
  debugger
  if (data && data.createTime)
    data.createTime = dayjs(data.createTime).format('YYYY-MM-DD HH:mm')
  if (data && data.updateTime)
    data.updateTime = dayjs(data.updateTime).format('YYYY-MM-DD HH:mm')

  return data
}
// 多余的时间处理工具