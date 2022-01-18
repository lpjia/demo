import * as dayjs from 'dayjs'

/**
 * 判断分页的字段是否存在
 * @param num 
 * @returns
 */
export function isExistField(num?: number): boolean {
  // ===0 返回 true
  // !==0 继续判断 if(num) 返回 true 否则 返回 false
  return num === 0 ? true : num ? true : false
}


/**
 * 格式化显示的时间
 * @param data 
 */
export function formatDisplayTime(data: any): void {
  if (data && data.createTime) data.createTime = dayjs(data.createTime).format('YYYY-MM-DD HH:mm')
  if (data && data.updateTime) data.updateTime = dayjs(data.updateTime).format('YYYY-MM-DD HH:mm')
}