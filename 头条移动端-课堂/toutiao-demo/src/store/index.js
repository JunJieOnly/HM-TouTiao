import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from "@/utils/storage"
Vue.use(Vuex)
// 每次刷新页面,vuex都会自动执行一次，导致无法持久性保存
const userKey = "TOUTIAO_USER" // 优化
const store = new Vuex.Store({
  // 共享数据
  state: {
    // 持久化保存token
    user: getItem(userKey) || {}
  },
  // 计算属性
  getters: {
  },
  // 修改数据
  mutations: {
    setUser(state, data) {
      // 储存到state
      state.user = data
      //本地保存
      setItem(userKey, data)
    }
  },
  // 异步执行
  actions: {
  },
  // 模块化
  modules: {
  }
})
export default store