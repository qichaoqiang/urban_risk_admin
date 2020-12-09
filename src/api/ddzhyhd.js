import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addDzzhyhdBase(params) {
    return fetchPost('/api/dizhizaihaiyinhuandian', params)
  },
  // 基本信息
  getDzzhyhdBase(params) {
    return fetchGet(`/api/dizhizaihaiyinhuandian/${params}`)
  },
}
