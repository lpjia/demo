import request from '@/utils/request'

// 员工工时报表汇总
export function workingHoursSummary(query) {
  return request({
    url: '/workingHours/summary',
    method: 'get',
    params: query
  })
}

// 员工工时报表统计
export function workingHoursStat(query) {
  return request({
    url: '/workingHours/statistics',
    method: 'get',
    params: query
  })
}
