/* export function getUsers() {
  const data = localStorage.getItem('users')
  if (data) {
    return JSON.parse(data)
  }
  return []
} */
/* 上面是没有用依赖倒置原则的代码, 直接用localStorage方案 */



import { Store } from "../store"

export async function getUsers(store: Store) {
  const data = await store.getData('users')
  return data ?? []
}