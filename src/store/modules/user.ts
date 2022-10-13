import { Module } from 'vuex';
interface State {
  userInfo: any; //展开收起
}
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
    };
  },
  getters: {
    userInfo: (state) => state.userInfo,
  },
  // 只能同步
  mutations: {
    toggleUserInfo(state, type) {
      state.userInfo = type;
    },
  },
  // 支持异步,可以考虑引入API
  actions: {
    toggleUserInfo({ commit }, type) {
      commit('toggleUserInfo', type);
    },
  }
};

export default store;
