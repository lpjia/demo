import dayjs from 'dayjs'

interface TimeType {
  createTime?: string
  updateTime?: string
}

export function formatDisplayTime<T extends TimeType>(data: T): void {
  if (data && data.createTime) data.createTime = dayjs(data.createTime).format('YYYY-MM-DD HH:mm')
  if (data && data.updateTime) data.updateTime = dayjs(data.updateTime).format('YYYY-MM-DD HH:mm')
}