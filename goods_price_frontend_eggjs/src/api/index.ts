import request from '@/utils/request'
import type { FormData } from '@/view/Home.vue'

export interface ProductNameType {
  productName: string
}


/* 关于 Parameters 拿参数的类型 */
type A = Parameters<typeof getProductListWithPriceByName>
type B = A[0]
type C = A[number]


export function getUnitList() {
  return request({
    url: '/unitList',
    method: 'GET',
  })
}

export function getShopList() {
  return request({
    url: '/shopList',
    method: 'GET',
  })
}

export function getProductList() {
  return request({
    url: '/productList',
    method: 'GET',
  })
}

export function addProductPriceHistory(data: FormData) {
  return request({
    url: '/productPriceHistory',
    method: 'POST',
    data
  })
}

export function getProductByName(query: ProductNameType) {
  return request({
    url: '/productByName',
    method: 'GET',
    params: query
  })
}

export function getProductPriceHistory(productId: number) {
  return request({
    url: '/productPriceHistory/' + productId,
    method: 'GET',
  })
}

export function getProductListWithPriceByName(productName: string) {
  return request({
    url: '/productListWithPriceByName/' + productName,
    method: 'GET',
  })
}

// export function getShopList(data) {
//   return request({
//     url: '/shopList',
//     method: 'POST',
//     data
//   })
// }

// export function getUnitList(query: any) {
//   return request({
//     url: '/unitList',
//     method: 'GET',
//     params: query
//   })
// }