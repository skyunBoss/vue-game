import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

// 路由懒加载
const Login = () => import('@/components/login')
const Home = () => import('@/components/home')

/**auth false 不需要登录可以访问 auth true 必须要登录才可以访问  默认为true**/
const router = new Router({
  base: '/game/',
  routes: [
    { // 根路径
      path: '/',
      redirect: '/home',
      component: Home
    },  
    { // 首页
      path: '/home',
      component: Home
    },
    { // 登录
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach(({meta, path}, from, next) => { 
  var { auth = true } = meta
  var isLogin = Boolean(store.state.login.token) //true用户已登录， false用户未登录
  if (auth && !isLogin && path !== '/login') {
    return next({ 
      path: '/login' 
    })
  }
  if(isLogin && path == '/login'){
    return next({ 
      path: '/' 
    })
  }
  next()
})

export default router
