import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCbxzBase(params) {
    return fetchPost('/api/chuanboxiuzaoqiye', params)
  },
  // 基本信息
  getCbxzBase(params) {
    return fetchGet(`/api/chuanboxiuzaoqiye/${params}`)
  },
  // 主要生产作业保存
  addZysczyInfo(params) {
    return fetchPost(`/api/zhuyaoshengchanzuoye`, params)
  },
  // 主要生产作业列表
  getZysczyList(params) {
    return fetchGet('/api/zhuyaoshengchanzuoye', params)
  },
  // 主要生产作业删除
  deleteZysczyInfo(id) {
    return fetchDelete(`/api/zhuyaoshengchanzuoye/${id}`)
  },
  // 主要设备保存
  addZysbInfo(params) {
    return fetchPost(`/api/zhuyaoshebei`, params)
  },
  // 主要设备列表
  getZysbList(params) {
    return fetchGet('/api/zhuyaoshebei', params)
  },
  // 主要设备删除
  deleteZysbInfo(id) {
    return fetchDelete(`/api/zhuyaoshebei/${id}`)
  },
}
