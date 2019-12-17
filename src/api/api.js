import { fetchPost, fetchGet } from './axios'

export default {
  // 获取验证码
  sendPhoneCodeV1(params) {
    return fetchPost('/user/sendPhoneCodeV1', params)
  },

  // 登录
  loginV1(params) {
    return fetchPost('/user/loginV1', params)
  },

  // 下单
  checkoutCounterV1(params) {
    return fetchPost('order/checkoutCounterV2', params)
  },

  // 支付
  getPayCodeV1(params) {
    return fetchPost('order/getPayCodeV2', params)
  },

  // 获取订单状态
  getOrderStatus(params) {
    return fetchPost('order/getOrderDetailV1', params)
  },
}
