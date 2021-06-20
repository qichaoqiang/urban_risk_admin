import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCsBase(params) {
    return fetchPost('/api/chaoshi', params)
  },
  // 基本信息
  getCsBase(params) {
    return fetchGet(`/api/chaoshi/${params}`)
  },
}
