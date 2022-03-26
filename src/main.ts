import { createApp } from 'vue';
import App from './App.vue';
import Vue3SeamlessScroll from '../package/index'

const app = createApp(App)
app.use(Vue3SeamlessScroll)
app.mount('#app')
