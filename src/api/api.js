import { fetchPost, fetchGet } from './axios'

export default {
  // 获取所有社保贷列表
  getKnowleage (params) {
    return fetchPost('/knowleage_card/list', params)
  },

  // 获取所有社保贷列表
  getHomepage (params) {
    return fetchGet('/expert/homepage', params)
  },

  // 获取openid
  weixinHasBind (params) {
    return fetchGet('/wechat-bind/hasBind', params)
  },

  //绑定手机号
  weixinBindPhone (params) {
    return fetchPost('wechat-bind/bind', params)
  }
}
