import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
// import qs from 'qs'
import { Toast } from 'vant'

Vue.use(Toast)

// 响应时间
axios.defaults.timeout = 100000
axios.defaults.baseURL = process.env.VUE_APP_API
// 测试地址（内网)
// axios.defaults.baseURL = 'http://tax-caishui-merchant.int.anniu-inc.com'
// 线上环境地址
// axios.defaults.baseURL = 'https://wap-api.taxlioner.com'
// 本地环境地址
// axios.defaults.baseURL = 'http://172.100.9.71:8080'

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
  }
  // let token = localStorage.getItem('token')
  // if (token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['Authorization'] = token
  // }
  return config
}, (error) => {
  Toast('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (res.status !== 200) {
    Toast('系统异常')
    return Promise.reject(res)
  } else if (res.data.code !== 0) {
    let info = '系统异常'
    // switch (res.data.code) {
    //   case 10000:
    //     router.push('/bindPhone')
    //     info = '您登录信息已过期'
    //     break;
    //   case 10001:
    //     router.push('/bindPhone')
    //     info = '您登录信息已过期'
    //     break;
    //   case 11000:
    //     return Promise.resolve(res)
    // }
    if (res.data.msg) {
      info = res.data.msg
    }
    Toast(info)
    return Promise.reject(res)
  }
  return Promise.resolve(res)
}, (error) => {
  Toast('网络异常')
  console.log(error)
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        // if (response.headers.authorization) {
        //   store.dispatch('save_token', response.headers.authorization)
        // }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        // if (response.headers.authorization) {
        //   store.dispatch('save_token', response.headers.authorization)
        // }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
