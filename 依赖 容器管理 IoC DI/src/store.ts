import { Injectable } from "./decorators"

export interface Store {
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<void>
}

// 接口运行时不存在, 用 Symbol 当 provider 的 token
export const STORE = Symbol("STORE")

@Injectable()
export class StorageStore implements Store {
  async get(key: string) {
    console.log(`[StorageStore] 从 localStorage 读取: ${key}`)
    return { users: [{ id: 1, name: "localStorage 用户" }] }
  }
  async set(key: string, value: any) {
    console.log(`[StorageStore] 写入 localStorage: ${key}`, value)
  }
}

@Injectable()
export class IndexdbStore implements Store {
  async get(key: string) {
    console.log(`[IndexdbStore] 从 IndexedDB 读取: ${key}`)
    return { users: [{ id: 2, name: "IndexedDB 用户" }] }
  }
  async set(key: string, value: any) {
    console.log(`[IndexdbStore] 写入 IndexedDB: ${key}`, value)
  }
}
