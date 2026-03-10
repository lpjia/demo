import request from '@/utils/request'
// import complexRequest from '@/utils/complex-request'

export function workshopList(data) {
  return request({
    url: '/workshop/list',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function workshopAdd(data) {
  return request({
    url: '/workshop/add',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function workshopbatchDelete(data) {
  return request({
    url: '/workshop/batchDelete',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function workshopEdit(data) {
  return request({
    url: '/workshop/edit',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function workshopJobList(data) {
  return request({
    url: '/workshop/jobList',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function sysJobAdd(data) {
  return request({
    url: '/sysJob/add',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}
export function sysJobDelete(data) {
  return request({
    url: '/sysJob/delete',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function workshopListAll(data) {
  return request({
    url: '/workshop/listAll',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function userJobList(data) {
  return request({
    url: '/userJob/list',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}
export function userJobListUser(data) {
  return request({
    url: '/userJob/listUser',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function userJobAdd(data) {
  return request({
    url: '/userJob/add',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function userJobBatchDelete(data) {
  return request({
    url: '/userJob/batchDelete',
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

export function excelUpload() {
  return '/userJob/importUsers'
}
