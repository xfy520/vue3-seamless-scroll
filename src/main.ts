import { createApp } from 'vue';
import App from './App.vue';
import Vue3SeamlessScroll from '../dist/vue3-seamless-scroll.es'

const app = createApp(App)
app.use(Vue3SeamlessScroll)
app.mount('#app')
