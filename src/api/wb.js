import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWbBase(params) {
    return fetchPost('/api/wangba', params)
  },
  // 基本信息
  getWbBase(params) {
    return fetchGet(`/api/wangba/${params}`)
  },
}
