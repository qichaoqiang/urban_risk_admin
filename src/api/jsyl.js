import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addJsylBase(params) {
    return fetchPost('/api/jinshuyelianqiye', params)
  },
  // 基本信息
  getJsylBase(params) {
    return fetchGet(`/api/jinshuyelianqiye/${params}`)
  },
  // 主要生产工艺保存
  addZyscgyInfo(params) {
    return fetchPost(`/api/zhuyaoshengchangongyi`, params)
  },
  // 主要生产工艺列表
  getZyscgyList(params) {
    return fetchGet('/api/zhuyaoshengchangongyi', params)
  },
  // 主要生产工艺删除
  deleteZyscgyInfo(id) {
    return fetchDelete(`/api/zhuyaoshengchangongyi/${id}`)
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
