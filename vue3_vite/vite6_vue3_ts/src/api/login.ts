import request from '@/util/request'

export function getToken(query: unknown) {
  return request({
    url: '/connect/token',
    method: 'GET',
    params: query
  })
}

export function getToken2(data: unknown) {
  return request({
    url: '/connect/token',
    method: 'POST',
    data
  })
}