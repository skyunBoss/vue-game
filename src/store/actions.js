import axios from 'axios'
import Qs from 'qs'
import router from '../router'
import { Toast } from 'mint-ui'
import { USER_SIGNIN,USER_SIGNOUT } from './types'

// login
export const UserLogin = ({ commit }, data) => {
  axios.post('/api/myauth/api-token-auth/',data)
    .then(res =>{  //success
      if(res.data && res.data.role == 'CHILD'){
        commit(USER_SIGNIN, res.data)
        window.location = '/'
      }else if(res.data.role !== 'CHILD'){
        Toast({
          message: '孩子端必须登录孩子的账号',
          position: 'bottom'
        })
      }else{
        window.location = '/login'        
      }
    })
    .catch(error => {  //error
      Toast({
        message: '请检查用户名和密码',
        position: 'bottom'
      })
    })
}

// loginOut TODO
export const UserLogout = ({ commit }, message) => {
  axios.post('/api/myauth/logout/')
    .then(res => {
      commit(USER_SIGNOUT)
      router.push({
        path: '/login'
      })      
      Toast({
        message: message,
        position: 'bottom'
      })
    })
    .catch(error => {
      console.log(error)
    })
}

