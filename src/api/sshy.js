import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addSshyBase(params) {
    return fetchPost('/api/shuishanghuoyun', params)
  },
  // 基本信息
  getSshyBase(params) {
    return fetchGet(`/api/shuishanghuoyun/${params}`)
  },
  // 水上货运船舶信息保存
  addSshycbxxInfo(params) {
    return fetchPost(`/api/shuishanghuoyunchuanboxinxi`, params)
  },
  // 水上货运船舶信息列表
  getSshycbxxList(params) {
    return fetchGet('/api/shuishanghuoyunchuanboxinxi', params)
  },
  // 水上货运船舶信息删除
  deleteSshycbxxInfo(id) {
    return fetchDelete(`/api/shuishanghuoyunchuanboxinxi/${id}`)
  },
}
