import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addZdBase(params) {
    return fetchPost('/api/zadao', params)
  },
  // 基本信息
  getZdBase(params) {
    return fetchGet(`/api/zadao/${params}`)
  },
  // 匝道信息保存
  addZdxxInfo(params) {
    return fetchPost(`/api/zadaoxinxi`, params)
  },
  // 匝道信息列表
  getZdxxList(params) {
    return fetchGet('/api/zadaoxinxi', params)
  },
  // 匝道信息删除
  deleteZdxxInfo(id) {
    return fetchDelete(`/api/zadaoxinxi/${id}`)
  },
}
