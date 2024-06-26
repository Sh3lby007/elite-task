import './assets/base.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .mount('#app')
