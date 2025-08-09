import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import { ENV } from '@/../env.local'
import ToastService from 'primevue/toastservice'

const app = createApp(App)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.use(vue3GoogleLogin, {
  clientId: ENV.GOOGLE.CLIENT_ID,
})
app.use(router)

app.mount('#app')
