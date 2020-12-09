import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addDtjsBase(params) {
    return fetchPost('/api/ditiejianshe', params)
  },
  // 基本信息
  getDtjsBase(params) {
    return fetchGet(`/api/ditiejianshe/${params}`)
  },
  // 地铁建设站点信息保存
  addDtjszdxxInfo(params) {
    return fetchPost(`/api/ditiejianshezhandianxinxi`, params)
  },
  // 地铁建设站点信息列表
  getDtjszdxxList(params) {
    return fetchGet('/api/ditiejianshezhandianxinxi', params)
  },
  // 地铁建设站点信息删除
  deleteDtjszdxxInfo(id) {
    return fetchDelete(`/api/ditiejianshezhandianxinxi/${id}`)
  },
  // 地铁建设区间信息保存
  addDtjsqjxxInfo(params) {
    return fetchPost(`/api/ditiejianshequjianxinxi`, params)
  },
  // 地铁建设区间信息列表
  getDtjsqjxxList(params) {
    return fetchGet('/api/ditiejianshequjianxinxi', params)
  },
  // 地铁建设区间信息删除
  deleteDtjsqjxxInfo(id) {
    return fetchDelete(`/api/ditiejianshequjianxinxi/${id}`)
  },
}
