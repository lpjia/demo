import request from '@/utils/request'

interface CommonRes<T = {}> {
  code: number
  msg: string
  data: T
}

type PromiseRes<T> = Promise<CommonRes<T>>

interface LoginData {
  username: string
  password: string
}

interface LoginRes {
  token: string
}

interface UserInfoRes {
  username: string
  roles: string[]
  menus: unknown[]
  avatar: string
}


export function login(data: LoginData): PromiseRes<LoginRes> {
  return request({
    url: '/api/getToken',
    method: 'POST',
    data
  })
}


/* 以商品goods来举例 增删改查 restFul
查所有商品 GET goodsById
查单个商品 GET goods
添加商品 POST goods
更新商品 PUT goodsById
删除商品 DELETE goodsByIdpmo, */
export const getGoodsById = (data: LoginData) =>
  request.post('/goodsById', data)
export const createGoods = () =>
  request.get('/')

// export function getUrl(query:) {
//   return request({
//     url: '',
//     method: 'GET',
//     params: query
//   })
// }