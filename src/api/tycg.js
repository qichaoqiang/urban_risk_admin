import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addTycgBase(params) {
    return fetchPost('/api/tiyuchangguan', params)
  },
  // 基本信息
  getTycgBase(params) {
    return fetchGet(`/api/tiyuchangguan/${params}`)
  },
  // 活动安排保存
  addHdapInfo(params) {
    return fetchPost(`/api/huodonganpai`, params)
  },
  // 活动安排列表
  getHdapList(params) {
    return fetchGet('/api/huodonganpai', params)
  },
  // 活动安排删除
  deleteHdapInfo(id) {
    return fetchDelete(`/api/huodonganpai/${id}`)
  },
}
