import request from '@/utils/request.js'

// export function apiGetHello(query) {
//   return request({
//     url: '/api/app/list',
//     method: 'GET',
//     params: query
//   })
// }

// export function findAll(query) {
//   return request({
//     url: '/api/post',
//     method: 'GET',
//     params: query
//   })
// }

// export function createPost(data) {
//   return request({
//     url: '/api/post',
//     method: 'POST',
//     data
//   })
// }

// export function createCommodity(data) {
export function commodityCreate(data) {
  return request({
    url: '/api/commodity',
    method: 'POST',
    data
  })
}

// export function getCommodity(query) {
export function commodityList(query) {
  return request({
    url: '/api/commodity',
    method: 'GET',
    params: query
  })
}

export function commodityById(data) {
  return request({
    url: '/api/commodity/' + data.id,
    method: 'GET',
  })
}

// export function apiUpdateUser(data) {
//   return request({
//     url: '/api/commodity',
//     method: 'PUT',
//     data
//   })
// }

// export function apiUpdate(data) {
//   return request({
//     url: '/api/app/list/' + data.id,
//     method: 'PUT',
//     // data
//   })
// }

// export function apiDelete(data) {
//   return request({
//     url: '/api/app/list/' + data.id,
//     method: 'DELETE',
//     // data
//   })
// }


