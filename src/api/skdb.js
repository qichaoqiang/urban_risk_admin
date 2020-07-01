import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addSkdbBase(params) {
    return fetchPost('/api/shuikudaba', params)
  },
  // 基本信息
  getSkdbBase(params) {
    return fetchGet(`/api/shuikudaba/${params}`)
  },
  // 库容信息保存
  addKrxxInfo(params) {
    return fetchPost(`/api/kurongxinxi`, params)
  },
  // 库容信息列表
  getKrxxList(params) {
    return fetchGet('/api/kurongxinxi', params)
  },
  // 库容信息删除
  deleteKrxxInfo(id) {
    return fetchDelete(`/api/kurongxinxi/${id}`)
  },
  // 安全鉴定保存
  addAqjdInfo(params) {
    return fetchPost(`/api/anquanjianding`, params)
  },
  // 安全鉴定列表
  getAqjdList(params) {
    return fetchGet('/api/anquanjianding', params)
  },
  // 安全鉴定删除
  deleteAqjdInfo(id) {
    return fetchDelete(`/api/anquanjianding/${id}`)
  },
  // 下游信息保存
  addXyxxInfo(params) {
    return fetchPost(`/api/xiayouxinxi`, params)
  },
  // 下游信息列表
  getXyxxList(params) {
    return fetchGet('/api/xiayouxinxi', params)
  },
  // 下游信息删除
  deleteXyxxInfo(id) {
    return fetchDelete(`/api/xiayouxinxi/${id}`)
  },
}
