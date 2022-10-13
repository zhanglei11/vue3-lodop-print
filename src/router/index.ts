import { createRouter, createWebHashHistory } from 'vue-router';
import registerRouteGuard from '@/utils/permission';
import routes from './routes';
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 注册路由守卫
registerRouteGuard(router);
export default router;
