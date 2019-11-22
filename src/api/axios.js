import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import storage from 'good-storage'
import { Toast } from 'vant'

Vue.use(Toast)

// 响应时间
axios.defaults.timeout = 100000
// axios.defaults.baseURL = process.env.VUE_APP_API

// 测试地址（内网)
// axios.defaults.baseURL = 'http://credit-api.int.anniu-tech.com'
// 线上环境地址
// axios.defaults.baseURL = 'https://good-lawyer-api.caishuiyu.com'
// 本地环境地址
axios.defaults.baseURL = 'http://172.100.11.188:8080/credit_api_war_exploded'

axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
  }
  config.withCredentials = false;
  config.headers = {
    'Content-Type': 'application/json;charset=utf-8',
    channel: 'wap',
    sessionId: storage.get('sessionId') || '',
    // packageName: 'com.anniu.white.web',
    clientId: localStorage.getItem('clientId'),
    deviceType: 'wap',
    platformFrom: storage.get('platform') || '',
    originFrom: storage.get('origin') || ''
  };
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
    switch (res.data.code) {
      case 500:
        return Promise.resolve(res)
    }
    if(res.data.msg) {
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
export function fetchPost (url, params, headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
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
export function fetchGet (url, param, headers) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
