import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import './styles/main.css';

const app = createApp(App);
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.mount('#app');
