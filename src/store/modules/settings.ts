import { Module } from 'vuex'
interface State {
  collapse: any //展开收起
  isFullscreen: any //是否全屏 默认false  true全屏
}
const getLocalStorage = (key: any) => {
  const value: any = localStorage.getItem(key)

  return JSON.parse(value)
}
const { collapse } = !getLocalStorage('vue-collapse') ? false : getLocalStorage('vue-collapse')
const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      collapse,
      isFullscreen: false
    }
  },
  getters: {
    collapse: (state) => state.collapse,
    isFullscreen: (state) => state.isFullscreen
  },
  // 只能同步
  mutations: {
    toggleCollapse(state) {
      state.collapse = !state.collapse
      localStorage.setItem('vue-collapse', state.collapse)
    },
    toggleIsFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen
    }
  },
  // 支持异步,可以考虑引入API
  actions: {
    toggleCollapse({ commit }) {
      commit('toggleCollapse')
    },
    toggleIsFullscreen({ commit }) {
      commit('toggleIsFullscreen')
    }
  }
}

export default store
