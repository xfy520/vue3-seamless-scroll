import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

import Vue3SeamlessScroll from '../packages/index';

const app = createApp(App);
app.use(ElementPlus);
app.use(Vue3SeamlessScroll);
app.mount('#app');
