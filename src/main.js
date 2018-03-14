import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import axios from 'axios'
import animate from 'animate.css'
import store from './store/index'
import 'mint-ui/lib/style.css'
import './assets/css/common.scss'
import 'lib-flexible/flexible.js'

// 引入mockjs
require('./mock.js')

Vue.use(Mint,animate)

Vue.config.productionTip = false

//定义全局变量
Vue.prototype.$axios = axios 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
