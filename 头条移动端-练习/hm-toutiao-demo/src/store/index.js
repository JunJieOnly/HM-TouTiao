import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from "@/utils/storage"
Vue.use(Vuex)
const userKey = "token"
const store = new Vuex.Store({
  state: {
    user: getItem(userKey) || {}
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 保存本地
      setItem(userKey, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
