import { Module } from 'vuex'
import { getMenuListByUser } from '@/pages/apis/menu'
import { handleTree } from '@/utils/common'
interface State {
  menus: any
}

const store: Module<State, unknown> = {
  namespaced: true,
  state() {
    return {
      menus: []
    }
  },
  getters: {
    menus: (state) => state.menus
  },

  mutations: {
    setMenus(state: any, menus: any) {
      menus.forEach((item: any) => {
        item.path = item.url
        item.title = item.menuName
        item.titleEn = item.menuName
        item.children = []
      })
      state.menus = handleTree(menus)
    }
  },

  actions: {
    storeMenus({ commit }: any) {
      getMenuListByUser({}).then((res: any) => {
        commit('setMenus', res.data)
      })
    }
  }
}

export default store
