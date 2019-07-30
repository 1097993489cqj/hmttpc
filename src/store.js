import Vue from 'vue'
import Vuex from 'vuex'
// import { getUser } from '@/utils/auth.js';
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:存储包含token在内的对象数据
    user: auth.getUser()
  },
  mutations: {
    // 修改状态中的user值为data形态值
    setUser (state, data) {
    // 修改state.user
      state.user = data
      // 更新ls中的token
      // 将数据放到本地存储
      auth.setUser(state.user)
    }
  }
})
