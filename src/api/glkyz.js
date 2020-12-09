import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addGlkyzBase(params) {
    return fetchPost('/api/gonglukeyunzhan', params)
  },
  // 基本信息
  getGlkyzBase(params) {
    return fetchGet(`/api/gonglukeyunzhan/${params}`)
  },
}
