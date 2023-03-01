import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const myPinia = createPinia()
myPinia.use(piniaPluginPersistedstate)

export default myPinia