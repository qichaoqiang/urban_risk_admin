import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCsgxsqBase(params) {
    return fetchPost('/api/changshuguanxianshuqi', params)
  },
  // 基本信息
  getCsgxsqBase(params) {
    return fetchGet(`/api/changshuguanxianshuqi/${params}`)
  },
  // 输气管道信息保存
  addGdxxsqInfo(params) {
    return fetchPost(`/api/shuqiguandaoxinxi`, params)
  },
  // 输气管道信息列表
  getGdxxsqList(params) {
    return fetchGet('/api/shuqiguandaoxinxi', params)
  },
  // 输气管道信息删除
  deleteGdxxsqInfo(id) {
    return fetchDelete(`/api/shuqiguandaoxinxi/${id}`)
  },
  // 高后果区保存
  addGhgqInfo(params) {
    return fetchPost(`/api/gaohouguoqu`, params)
  },
  // 高后果区列表
  getGhgqList(params) {
    return fetchGet('/api/gaohouguoqu', params)
  },
  // 高后果区删除
  deleteGhgqInfo(id) {
    return fetchDelete(`/api/gaohouguoqu/${id}`)
  },
}
