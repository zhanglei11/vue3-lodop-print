import { RouteRecordRaw } from 'vue-router';
const lomprint = () => import('@/views/index.vue');

const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'lomprint',
    component: lomprint,
    meta: {
      title: '打印',
      keepAlive: true
    }
  },
];

export default baseRoute;
