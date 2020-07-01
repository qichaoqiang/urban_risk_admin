import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addLybcBase(params) {
    return fetchPost('/api/lyuyoubaoche', params)
  },
  // 基本信息列表
  getLybcBase(params) {
    return fetchGet(`/api/lyuyoubaoche/${params}`)
  },
}
