import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import storage from 'good-storage'
import qs from 'qs'
import { Message } from 'view-design';

let axios_ = {...axios};

Vue.component('Message', Message);

// 响应时间
axios_.defaults.timeout = 100000
axios_.defaults.baseURL = process.env.VUE_APP_API

// 测试地址（内网)
// axios_.defaults.baseURL = 'http://credit-api.int.anniu-tech.com'
// 线上环境地址
// axios_.defaults.baseURL = 'https://good-lawyer-api.caishuiyu.com'
// 本地环境地址
// axios_.defaults.baseURL = 'http://172.100.8.116:8080/credit_api_war_exploded'

axios_.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    // config.data = qs.stringify(config.data)
  }
  config.withCredentials = false;
  if(config.url.indexOf('/oauth/token') == -1) {
    config.headers.Authorization = `${storage.get('token_type_v2')} ${storage.get('access_token_v2')}`
  }
  return config
}, (error) => {
  Message.error('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios_.interceptors.response.use((res) => {
  // 对响应数据做些事
  // if (res.ret !== 0) {
  //   Message.error('系统异常')
  //   return Promise.reject(res)
  // }
  // else if (res.data.code !== 0) {
  //   let info = '系统异常'
  //   switch (res.data.code) {
  //     case 500:
  //       return Promise.resolve(res)
  //   }
  //   if(res.data.msg) {
  //     info = res.data.msg
  //   }
  //   Message.error(info)
  //   return Promise.reject(res)
  // }
  return Promise.resolve(res)
}, (error) => {
  console.log(error);
  Message.error('登录信息失效，请重新登录')
  setTimeout(() => {
    router.replace('/login');
  }, 1000);
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params, headers) {
  return new Promise((resolve, reject) => {
    axios_.post(url, qs.stringify(params))
      .then(response => {
        resolve(response)
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
    axios_.get(url, { params: param })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default axios_
