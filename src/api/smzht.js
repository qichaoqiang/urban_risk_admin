import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addSmzhtBase(params) {
    return fetchPost('/api/shangmaozongheti', params)
  },
  // 基本信息
  getSmzhtBase(params) {
    return fetchGet(`/api/shangmaozongheti/${params}`)
  },
  // 人流信息保存
  addSmzhtRlxxInfo(params) {
    return fetchPost(`/api/shangmaozonghetirenliuxinxi`, params)
  },
  // 人流信息列表
  getSmzhtRlxxList(params) {
    return fetchGet('/api/shangmaozonghetirenliuxinxi', params)
  },
  // 人流信息删除
  deleteSmzhtRlxxInfo(id) {
    return fetchDelete(`/api/shangmaozonghetirenliuxinxi/${id}`)
  },
}
