import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
//挂载路由
import router from './router/index.js'
import App from './App.vue'
import '@/utils/request.js'
const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App)
.use(router)
.use(pinia)
.mount('#app')
