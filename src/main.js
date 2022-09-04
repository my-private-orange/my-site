import { createApp } from 'vue';
import App from './App.vue';
import '@/style/index.css';
import router from './router';
import '@/assets/fonts/fonts.css';

createApp(App).use(router).mount('#app');
