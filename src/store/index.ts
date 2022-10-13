import { createStore } from 'vuex';
import tagsBar from './modules/tagsBar';
const store = createStore({
  modules: {
    tagsBar: tagsBar,
  }
});

export default store;
