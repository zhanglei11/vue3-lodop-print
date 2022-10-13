import { RouteRecordRaw } from 'vue-router';
const lomprint = () => import('@/views/print/index.vue');

const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/print',
    meta: {
      title: '/',
      keepAlive: true
    }
  },
  {
    path: '/print',
    name: 'lomprint',
    component: lomprint,
    meta: {
      title: '打印',
      keepAlive: true
    }
  }
];

export default baseRoute;
