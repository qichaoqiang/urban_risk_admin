import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCsgxsyBase(params) {
    return fetchPost('/api/changshuguanxianshuyou', params)
  },
  // 基本信息
  getCsgxsyBase(params) {
    return fetchGet(`/api/changshuguanxianshuyou/${params}`)
  },
  // 输油管道信息保存
  addGdxxsyInfo(params) {
    return fetchPost(`/api/shuyouguandaoxinxi`, params)
  },
  // 输油管道信息列表
  getGdxxsyList(params) {
    return fetchGet('/api/shuyouguandaoxinxi', params)
  },
  // 输油管道信息删除
  deleteGdxxsyInfo(id) {
    return fetchDelete(`/api/shuyouguandaoxinxi/${id}`)
  },
}
