import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [createPersistedState({
    storage: localStorage,
    reducer(val) {
      return {
         // 只储存state中的user
         user: val.user
      }
    }
  })]
})


export default store
