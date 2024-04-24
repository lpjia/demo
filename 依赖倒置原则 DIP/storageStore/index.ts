import { Store } from "../store";

export const store: Store = {
  async getData(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null')
  },
  async setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  async hasData(key: string) {
    return localStorage.getItem(key) !== null
  }
}

/* localStorage方案 */