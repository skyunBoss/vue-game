import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    login
  },
  strict: process.env.NODE_ENV !== 'production' //在非生产环境下，使用严格模式
})
