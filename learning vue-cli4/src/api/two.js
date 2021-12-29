import request from '@/utils/request.js'

export function registerUser(data) {
  return request({
    url: '/api/user/register',
    method: 'POST',
    data
  })
}