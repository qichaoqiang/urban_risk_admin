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
    return fetchPost('/wechat-bind/bind', params)
  },

  //账户详情
  merchantDetail (params) {
    return fetchPost('/merchant/account/detail', params)
  },

  //消费列表
  merchantTransactionList (params) {
    return fetchPost('/merchant/account/transactionList', params)
  },

  //询价单详情
  intentionDetail (params) {
    return fetchGet('/intention/detail', params)
  },

  //报价
  intentionQuotePrice (params) {
    return fetchPost('/intention/quotePrice', params)
  },

  //购买
  intentionPurchase (params) {
    return fetchGet('/intention/purchase', params)
  },

  //充值
  recharge (params) {
    return fetchPost('/merchant/recharge', params)
  },

  //充值套餐
  rechargePackage (params) {
    return fetchPost('/merchant/rechargePackage', params)
  },
}
