import request from '@/utils/request.js'

export function apiGetHello(query) {
  return request({
    url: '/api/app/list',
    method: 'GET',
    params: query
  })
}

export function apiCreate(data) {
  return request({
    url: '/api/app/list',
    method: 'POST',
    data
  })
}

export function apiGetUser(query) {
  return request({
    url: '/api/app/user_one',
    method: 'GET',
    params: query
  })
}

export function apiUpdateUser(data) {
  return request({
    url: '/api/app/list/user',
    method: 'PUT',
    data
  })
}

export function apiUpdate(data) {
  return request({
    url: '/api/app/list/' + data.id,
    method: 'PUT',
    // data
  })
}

export function apiDelete(data) {
  return request({
    url: '/api/app/list/' + data.id,
    method: 'DELETE',
    // data
  })
}




export function findAll(query) {
  return request({
    url: '/api/post',
    method: 'GET',
    params: query
  })
}

export function createPost(data) {
  return request({
    url: '/api/post',
    method: 'POST',
    data
  })
}

export function createPost2(query) {
  return request({
    url: '/api/post/',
    method: 'GET',
    params: query
  })
}