import request from '@/utils/request'
import * as T from './types'

export const getToken = (params: T.I_LoginParams) =>
  request({
    url: '/connect/token',
    method: 'get',
    params
  })