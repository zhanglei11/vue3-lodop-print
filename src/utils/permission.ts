import { Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

const routesWhiteList: any = ['/','/login', '/404', '/403', '/500'];
const registerRouteGuard = (router: Router) => {
  /**
   * 全局前置守卫
   * to 将要跳转的路由
   * from 离开路由
   * next 是个方法 判断to.path 或者 from.path ,如果符合条件，则允许跳转
   */
  router.beforeEach((to: any, from: any, next) => {
    NProgress.start();
    if (routesWhiteList.includes(to.path)) {
      if(to.path === '/'){
        next({ path: '/login' });
      }else{
        next();
      }
    } else {
      next();
      // if (hasToken) {
      //   next();
      // } else {
      //   next();
      //   // next({ path: "/login" });
      // }
    }
  });

  /**
   * 全局解析守卫
   */
  router.beforeResolve(async (to: any, from: any, next) => {
    next();
  });

  /**
   * 全局后置守卫
   */
  router.afterEach((to: any, from: any, failure: any) => {
    // 改标题,监控上报一些基础信息
    document.title = to.meta.title;
    NProgress.done();
  });
};

export default registerRouteGuard;
