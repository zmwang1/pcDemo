import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储状态值的对象
  state: {
    isAdmin: false, //是否是总管理员（增加管理员入口）
    userData: {}, //用户详情
  },
  mutations: {
    setAdmin(state, val) {
      state.isAdmin = val
    },
  },
  actions: {

  }
})