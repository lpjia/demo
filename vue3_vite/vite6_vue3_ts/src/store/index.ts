import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(
  createPersistedState({ // 全局配置
    storage: sessionStorage, // 用 sessionStorage 来存
    key: id => `__persisted__${id}`
  })
)

export default pinia