import { fetchPost, fetchGet } from './axios'
// import { fetchPost } from './axios'

export default {
  // 获取所有社保贷列表
  getKnowleage (params) {
    return fetchPost('/knowleage_card/list', params)
  },

  // 获取所有社保贷列表
  getHomepage (params) {
    return fetchGet('/expert/homepage', params)
  }
}
