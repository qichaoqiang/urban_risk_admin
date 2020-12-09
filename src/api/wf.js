import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWfBase(params) {
    return fetchPost('/api/weifang', params)
  },
  // 基本信息
  getWfBase(params) {
    return fetchGet(`/api/weifang/${params}`)
  },
}
