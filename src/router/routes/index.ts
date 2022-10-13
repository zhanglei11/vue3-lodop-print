import { RouteRecordRaw } from 'vue-router';
import baseRoutes from './base'; //基础
import pagesRoutes from '@/pages/router'; //基础

const routes: RouteRecordRaw[] = [...baseRoutes, ...pagesRoutes]

export default routes;
