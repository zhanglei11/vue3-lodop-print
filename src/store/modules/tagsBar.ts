import { Module } from 'vuex';
interface State {
  visitedRoutes: any;
}
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      visitedRoutes: []
    };
  },
  getters: {
    visitedRoutes: (state) => state.visitedRoutes
  },
  // 只能同步
  mutations: {
    /**
     * @description 添加标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    addVisitedRoute(state: any, route: any) {
      if (['/', '/login', '/404', '/403', '/500'].includes(route.path)) {
        return;
      }
      let target = state.visitedRoutes.find((item: any) => item.path === route.path);

      if (target) {
        if (route.fullPath !== target.fullPath) {
          Object.assign(target, route);
        }
        return;
      }
      state.visitedRoutes.push(Object.assign({}, route));
    },
    /**
     * @description 删除当前标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delVisitedRoute(state: any, route: any) {
      state.visitedRoutes.forEach((item: any, index: number) => {
        if (item.path === route.path) {
          state.visitedRoutes.splice(index, 1);
        }
      });
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delOthersVisitedRoutes(state: any, route: any) {
      state.visitedRoutes = state.visitedRoutes.filter(
        (item: any) => item.meta.affix || item.path === route.path
      );
    },
    /**
     * @description 删除当前标签页左边全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delLeftVisitedRoutes(state: any, route: any) {
      let index = state.visitedRoutes.length;

      state.visitedRoutes = state.visitedRoutes.filter((item: any) => {
        if (item.name === route.name) {
          index = state.visitedRoutes.indexOf(item);
        }
        return item.meta.affix || index <= state.visitedRoutes.indexOf(item);
      });
    },
    /**
     * @description 删除当前标签页右边全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delRightVisitedRoutes(state: any, route: any) {
      let index = state.visitedRoutes.length;

      state.visitedRoutes = state.visitedRoutes.filter((item: any) => {
        if (item.name === route.name) {
          index = state.visitedRoutes.indexOf(item);
        }
        return item.meta.affix || index >= state.visitedRoutes.indexOf(item);
      });
    },
    /**
     * @description 删除全部多标签页
     * @param {*} state
     * @returns
     */
    delAllVisitedRoutes(state: any) {
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => item.meta.affix);
    }
  },
  // 支持异步,可以考虑引入API
  actions: {
    /**
     * @description 添加标签页
     * @param {*} { commit }
     * @param {*} route
     */
    addVisitedRoute({ commit }: any, route: any) {
      commit('addVisitedRoute', route);
    },
    /**
     * @description 删除当前标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delVisitedRoute({ commit }: any, route: any) {
      commit('delVisitedRoute', route);
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delOthersVisitedRoutes({ commit }: any, route: any) {
      commit('delOthersVisitedRoutes', route);
    },
    /**
     * @description 删除当前标签页左边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delLeftVisitedRoutes({ commit }: any, route: any) {
      commit('delLeftVisitedRoutes', route);
    },
    /**
     * @description 删除当前标签页右边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delRightVisitedRoutes({ commit }: any, route: any) {
      commit('delRightVisitedRoutes', route);
    },
    /**
     * @description 删除全部多标签页
     * @param {*} { commit }
     */
    delAllVisitedRoutes({ commit }: any) {
      commit('delAllVisitedRoutes');
    }
  }
};

export default store;
