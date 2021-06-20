import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addGlqlBase(params) {
    return fetchPost('/api/gongluqiaoliang', params)
  },
  // 基本信息
  getGlqlBase(params) {
    return fetchGet(`/api/gongluqiaoliang/${params}`)
  },
}
