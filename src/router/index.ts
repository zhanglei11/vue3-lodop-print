import { createRouter, createWebHashHistory } from 'vue-router';
import registerRouteGuard from '@/utils/permission';
const lomprint = () => import('@/views/index.vue');
const routes = [
  {
    path: '/',
    name: 'lomprint',
    component: lomprint,
    meta: {
      title: '打印',
      keepAlive: true
    }
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 注册路由守卫
registerRouteGuard(router);
export default router;
