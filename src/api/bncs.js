import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addBncsBase(params) {
    return fetchPost('/api/binanchangsuo', params)
  },
  // 基本信息
  getBncsBase(params) {
    return fetchGet(`/api/binanchangsuo/${params}`)
  },
}
