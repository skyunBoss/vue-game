import axios from 'axios'
import router from '../router'
import store from '../store'
import { USER_SIGNIN,USER_SIGNOUT } from '../store/types'
import { Toast } from 'mint-ui'

axios.defaults.timeout = 5000
axios.defaults.baseURL = ''


//http request 拦截器
axios.interceptors.request.use(
  config => {
    const userParse = JSON.parse(localStorage.getItem('user'))
    config.data = config.data
    if(userParse){
      config.headers = {
        'Content-Type':'application/json',
        'Authorization': 'token '+userParse.token
      }
    }else{
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
    return config;
  },
  error => {
    return Promise.reject(err.response.data)
  }
)


//http response 拦截器 错误处理
axios.interceptors.response.use(
  response => {  
    return response;
  },
  error => {
    Promise.reject(error).catch(result => {
      console.log(result.response)
    })
    if(error.response){  
      switch(error.response.status){
        case 401:
          store.commit(USER_SIGNOUT)
          router.push({
            path: '/login'
          }) 
          Toast({
            message: '账号在其他设备登录，请重新登录',
            duration: '1000'
          })
      }
    }

    return Promise.reject(error.response.data)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
