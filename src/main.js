import adapter from 'webrtc-adapter';
import 'image-capture';
import { createApp } from 'vue';
import App from './App.vue';
import '@/style/index.css';
import router from './router';
import '@/assets/fonts/fonts.css';
// import 'mind-ar/dist/mindar-image.prod.js';
// import 'mind-ar/dist/mindar-image-aframe.prod.js';

createApp(App).use(router).mount('#app');
