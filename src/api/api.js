import { fetchPost, fetchGet } from './axios'

export default {
  /**
   * 答题卡-获取问题回答详情
   * @function getAnswerDetail
   * @type 'Get'
   * @param id Number
   */
  getAnswerDetail (params) {
    return fetchGet('/user_question/answered_detail', params)
  },
  /**
   * 知识卡-获取知识卡详情
   * @function getknowleageCardDetail
   * @type 'Get'
   * @param questionId Number
   */
  getknowleageCardDetail (params) {
    return fetchGet('/knowleage_card/detail', params)
  },
  /**
   * 知识卡-参考文书-获取参考文书详情
   * @function getRegulationDetail
   * @type 'Get'
   * @param id Number
   */
  getRegulationDetail (params) {
    return fetchGet('/regulation_library/regulation_detail', params)
  },
  /**
   * 知识卡-参考文书-获取法规解读详情
   * @function getInterpretationDetail
   * @type 'Get'
   * @param id Number
   */
  getInterpretationDetail (params) {
    return fetchGet('/regulation_library/interpretation_detail', params)
  },
  /**
   * 提问-获取问题分类
   * @function getQuestionCategory
   * @type 'POST'
   * @param id Number
   */
  getQuestionCategory (params) {
    return fetchPost('/user_question/question_category', params)
  },
  /**
   * 提问-提交问题
   * @function getQuestionCategory
   * @type 'POST'
   * @param answerUserId Number
   * @param firstCategory Number
   * @param secondCategory Number
   * @param title String
   */
  getQuestionSubmit (params) {
    return fetchPost('/user_question/submit', params)
  },
  /**
   * 登录-发送登录验证码
   * @function sendVerifycode
   * @type 'POST'
   * @param clientType String
   * @param verifyType String
   * @param captchaValidate String
   * @param phone String
   */
  sendVerifycode (params) {
    return fetchPost('/auth/send_login_verifycode', params)
  },
  /**
   * 登录-短信验证码登录
   * @function loginVerifycode
   * @type 'POST'
   * @param clientType String
   * @param verifyType String
   * @param verifycode String
   * @param phone String
   */
  loginVerifycode (params) {
    return fetchPost('/auth/login_verifycode', params)
  },
  /**
   * 绑定手机号-发送验证码
   * @function bindPhoneSendVerifycode
   * @type 'POST'
   * @param clientType String
   * @param captchaValidate String
   * @param phone String
   */
  bindPhoneSendVerifycode (params) {
    return fetchPost('/auth/send_bind_verifycode', params)
  },
  /**
   * 绑定手机号-绑定手机号
   * @function bindPhone
   * @type 'POST'
   * @param clientType String [app, h5, pc]
   * @param authType String [weixin]
   * @param authKey String  [code ]
   * @param verifycode String
   * @param phone String
   */
  bindPhone (params) {
    return fetchPost('/auth/login_third_authbind', params)
  },
  /**
   * 微信授权-微信授权登录跳转地址
   * @function weixinAuthorizeUrl
   * @type 'POST'
   * @param authorizeCallback String
   */
  weixinAuthorizeUrl (params) {
    return fetchPost('/auth/weixin/authorize_url', params)
  },
  /**
   * 微信授权-微信授权登录
   * @function weixinAuthLogin
   * @type 'POST'
   * @param code String
   */
  weixinAuthLogin (params) {
    return fetchPost('/auth/login_weixin', params)
  },
  /**
   * 微信授权-检查手机号是否已绑定
   * @function checkBindPhone
   * @type 'GET'
   */
  checkBindPhone (params) {
    return fetchGet('/user/check_bind_phone', params)
  },
  /**
   * 打赏-打赏付款
   * @function rewardOrderPay
   * @type 'POST'
   * @param amount Number
   * @param payChannel String [weixin, alipay]
   * @param payReturnUrl String 支付完成返回地址
   * @param payType String [weixin_jsapi(微信JSAPI支付), weixin_h5(Wap网页端支付), weixin_app(App端支付), alipay_h5, alipay_app]
   * @param questionId Number
   * @param questionType Number  [1(知识卡), 2(问题卡)]
   * @param rewardType String ["question"]
   * @param leaveMessage String
   */
  rewardOrderPay (params) {
    return fetchPost('/reward/order_pay', params)
  },
  /**
   * 打赏-打赏付款
   * @function weixinJsapiConfig
   * @type 'POST'
   * @param url String
   */
  weixinJsapiConfig (params) {
    return fetchPost('/weixin/jsapi_config', params)
  },
  /**
   * 获取支付方式
   * @function payChannels
   * @type 'GET'
   */
  payChannels () {
    return fetchGet('/pay/channels')
  },
  /**
   * 获取支付方式
   * @function payChannelsWeixinJsapiSupport
   * @type 'GET'
   */
  payChannelsWeixinJsapiSupport () {
    return fetchGet('/pay/channel/weixin_jsapi_support')
  },
  /**
   * 更新token  未用到
   * @function refreshToken
   * @type 'GET'
   */
  refreshToken () {
    return fetchGet('/auth/refresh_token')
  },
}
