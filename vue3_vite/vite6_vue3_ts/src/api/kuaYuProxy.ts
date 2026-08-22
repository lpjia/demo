import request from '@/util/request'

export function getDataApi(query: unknown) {
  return request({
    url: '/api/test',
    method: 'GET',
    params: query // axios自动把简单obj转为查询字符串
  })
}