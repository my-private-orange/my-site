import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/map',
  },
  {
    path: '/map',
    component: () => import('@/views/Map/index.vue'),
  },
  {
    path: '/pray-ar',
    component: () => import('@/views/pray-ar.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
