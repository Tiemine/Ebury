import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'
import './assets/currency-flags.min.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
