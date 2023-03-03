import request from '@/utils/request'

interface LoginData {
  username: string
  password: string
}
interface LoginComplexRes {
  code: number
  msg: string
  data: {
    token: string
    tokenHead: string
  }
}
// function复杂写法
export function loginComplex(data: LoginData): Promise<LoginComplexRes> {
  return request({
    url: '/getToken',
    method: 'POST',
    data
  })
}
// export function getUrl(query) {
//   return request({
//     url: '',
//     method: 'GET',
//     params: query
//   })
// }



interface CommonRes<T = {}> {
  code: number
  msg: string
  data: T
}
interface LoginRes {
  token: string
  tokenHead: string
}
type PromiseRes<T> = Promise<CommonRes<T>>

export interface MenuRes {
  id: number
  parentId: number
  name: string
  icon: string
}

interface UserInfoRes {
  username: string
  realname: string
  avatar: string
  roles: string[]
  menus: MenuRes[]
}

// =>简单写法
// 考虑什么情况下可以省略/api, 统一写
// nginx代理的话, 又是什么情况, 是否可以统一写
export const login = (data: LoginData): PromiseRes<LoginRes> =>
  request.post('/api/getToken', data)
export const getUserInfo = (): PromiseRes<UserInfoRes> =>
  request.get('/api/getUserInfo')





/* 以商品goods来举例 增删改查 restFul
查所有商品 GET /goods/getGoodsList
/getGoodsListByPage
查单个商品 GET /goods/getGoodsById
添加商品 POST /goods/createGoods
更新商品 PUT /goods/updateGoodsById
删除商品 DELETE goods/deleteGoodsById, */
export const getGoodsById = (data: LoginData) =>
  request.post('/goodsById', data)
export const createGoods = () =>
  request.get('/')
