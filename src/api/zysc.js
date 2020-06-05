import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addZyscBase(params) {
    return fetchPost('/api/zhuanyeshichang', params)
  },
  // 基本信息
  getZyscBase(params) {
    return fetchGet(`/api/zhuanyeshichang/${params}`)
  },
  // 人流信息保存
  addZyscRlxxInfo(params) {
    return fetchPost(`/api/zhuanyeshichangrenliuxinxi`, params)
  },
  // 人流信息列表
  getZyscRlxxList(params) {
    return fetchGet('/api/zhuanyeshichangrenliuxinxi', params)
  },
  // 人流信息删除
  deleteZyscRlxxInfo(id) {
    return fetchDelete(`/api/zhuanyeshichangrenliuxinxi/${id}`)
  },
}
