import { createStore } from 'vuex';
import settings from './modules/settings';
import tagsBar from './modules/tagsBar';
import menus from './modules/menus'
import user from './modules/user'
const store = createStore({
  modules: {
    settings: settings,
    tagsBar: tagsBar,
    menus: menus,
    user: user
  }
});

export default store;
