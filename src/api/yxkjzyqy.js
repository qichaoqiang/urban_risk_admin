import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYxkjzyqyBase(params) {
    return fetchPost('/api/youxiankongjianzuoyeqiye', params)
  },
  // 基本信息
  getYxkjzyqyBase(params) {
    return fetchGet(`/api/youxiankongjianzuoyeqiye/${params}`)
  },
}
